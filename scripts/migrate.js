const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');
const { promisify } = require('util');

const parser = new xml2js.Parser();
const readFile = promisify(fs.readFile);
const copyFile = promisify(fs.copyFile);
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

// Paths
const STORE_XML_PATH = path.join(__dirname, '../web-antigua/tienda.ochotierras.cl/tienda.xml'); // Renamed file
const UPLOADS_BASE_PATH = path.join(__dirname, '../web-antigua/tienda.ochotierras.cl/2021'); // Based on previous observation
const OUTPUT_IMAGE_DIR = path.join(__dirname, '../public/images/products');
const OUTPUT_DATA_FILE = path.join(__dirname, '../src/data/products-imported.ts');

// Function to recursively find a file associated with a URL
async function findImageFile(urlPart) {
    // urlPart comes as "wp-content/uploads/2021/05/image.jpg"
    // We need to match it against UPLOADS_BASE_PATH which seems to be the root of uploads

    // Clean up path: remove wp-content/uploads/
    let relativePath = urlPart.replace(/.*wp-content\/uploads\//, '');

    // We accept that UPLOADS_BASE_PATH might be just "2021" folder but contains year folders inside? 
    // Let's try direct constructing
    let candidatePath = path.join(UPLOADS_BASE_PATH, relativePath);

    // If exact match fails, try to find by filename mostly
    if (fs.existsSync(candidatePath)) {
        return candidatePath;
    }

    // Fallback: The user folder structure might be "2021/2021/..." or just "2021/..."
    // Let's try stripping the year from relative path if it duplicates
    // e.g. relative: 2021/05/img.jpg, base: .../2021. Combined: .../2021/2021/05/img.jpg

    // Try to search for the filename in the whole directory tree (expensive but safer)
    const filename = path.basename(relativePath);
    const found = await findFileInDir(UPLOADS_BASE_PATH, filename);
    return found;
}

async function findFileInDir(dir, filename) {
    try {
        const files = await readdir(dir);
        for (const file of files) {
            const fullPath = path.join(dir, file);
            const stats = await stat(fullPath);
            if (stats.isDirectory()) {
                const found = await findFileInDir(fullPath, filename);
                if (found) return found;
            } else if (file === filename) {
                return fullPath;
            }
        }
    } catch (e) {
        return null; // Dir issue
    }
    return null;
}

async function migrate() {
    console.log("Starting migration...");
    console.log(`Reading XML from: ${STORE_XML_PATH}`);

    if (!fs.existsSync(OUTPUT_IMAGE_DIR)) {
        fs.mkdirSync(OUTPUT_IMAGE_DIR, { recursive: true });
    }

    try {
        const xmlData = await readFile(STORE_XML_PATH);
        console.log("XML read. Parsing...");
        const result = await parser.parseStringPromise(xmlData);

        const channel = result.rss.channel[0];
        const items = channel.item;

        const attachments = items.filter(i => i['wp:post_type'][0] === 'attachment');
        const products = items.filter(i => i['wp:post_type'][0] === 'product');

        console.log(`Found ${products.length} products and ${attachments.length} attachments.`);

        const migratedProducts = [];

        for (const product of products) {
            // Only published products
            if (product['wp:status'][0] !== 'publish') continue;

            const title = product.title[0];
            const content = product['content:encoded'][0] || "";
            const description = content
                .replace(/<[^>]*>?/gm, '') // Strip HTML
                .replace(/&nbsp;/g, ' ')
                .replace(/\n+/g, ' ')
                .trim()
                .substring(0, 200) + "..."; // Truncate

            const meta = product['wp:postmeta'] || [];
            const getMeta = (key) => {
                const m = meta.find(m => m['wp:meta_key'][0] === key);
                return m ? m['wp:meta_value'][0] : null;
            };

            const price = parseInt(getMeta('_price') || '0');
            const regularPrice = parseInt(getMeta('_regular_price') || '0');
            const thumbnailId = getMeta('_thumbnail_id');
            const slug = product['wp:post_name'][0];

            let imageUrl = "/images/placeholder.jpg"; // Default

            if (thumbnailId) {
                const attach = attachments.find(a => a['wp:post_id'][0] === thumbnailId);
                if (attach) {
                    const url = attach['wp:attachment_url'][0];
                    console.log(`Looking for image: ${url}`);
                    const localFile = await findImageFile(url);

                    if (localFile) {
                        const ext = path.extname(localFile);
                        const newFileName = `${slug}${ext}`;
                        const targetPath = path.join(OUTPUT_IMAGE_DIR, newFileName);
                        await copyFile(localFile, targetPath);
                        imageUrl = `/images/products/${newFileName}`;
                        console.log(`✅ Copied image for ${slug}`);
                    } else {
                        console.log(`⚠️  Image not found locally for ${slug}. URL: ${url}`);
                    }
                }
            }

            // Infer category (simple logic)
            let category = "Vinos";
            if (product.category) {
                const cats = product.category.map(c => typeof c === 'string' ? c : c._);
                if (cats.includes('Vinos Tintos')) category = "Vinos Tintos";
                else if (cats.includes('Vinos Blancos')) category = "Vinos Blancos";
                else if (cats.includes('Pack')) category = "Packs";
                else if (cats.includes('Iconos') || cats.includes('Icono') || cats.includes('Vinos Icono')) category = "Vinos Iconos";
            }

            migratedProducts.push({
                id: slug, // Using slug as ID for simplicity
                name: title,
                slug: slug,
                description: description,
                price: price || regularPrice,
                category: category,
                image: imageUrl
            });
        }

        // Generate TS content
        const tsContent = `export const products = ${JSON.stringify(migratedProducts, null, 4)};`;
        fs.writeFileSync(OUTPUT_DATA_FILE, tsContent);

        console.log(`Migration complete. ${migratedProducts.length} products exported to ${OUTPUT_DATA_FILE}`);

    } catch (err) {
        console.error("Error parsing XML or processing:", err);
    }
}

migrate().catch(console.error);

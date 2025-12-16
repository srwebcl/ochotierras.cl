const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const walkSync = (dir, filelist = []) => {
    fs.readdirSync(dir).forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            filelist = walkSync(filePath, filelist);
        } else {
            filelist.push(filePath);
        }
    });
    return filelist;
};

const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
    console.error('Public directory not found');
    process.exit(1);
}

const files = walkSync(publicDir);
const images = files.filter(f => /\.(jpe?g|png|gif)$/i.test(f));

const mapping = {};
let processedCount = 0;

async function processImages() {
    console.log(`Found ${images.length} images to optimize.`);

    for (const file of images) {
        const ext = path.extname(file);
        const basename = path.basename(file, ext);
        const dir = path.dirname(file);
        const webpPath = path.join(dir, `${basename}.webp`);

        try {
            await sharp(file)
                .webp({ quality: 80 })
                .toFile(webpPath);

            // Log for mapping (relative paths for easier replacement)
            const relativeOld = path.relative(process.cwd(), file);
            const relativeNew = path.relative(process.cwd(), webpPath);
            mapping[relativeOld] = relativeNew;

            // Delete original
            fs.unlinkSync(file);
            console.log(`Converted: ${relativeOld} -> ${relativeNew}`);
            processedCount++;
        } catch (err) {
            console.error(`Failed to convert ${file}:`, err);
        }
    }

    fs.writeFileSync('image_mapping.json', JSON.stringify(mapping, null, 2));
    console.log(`\nDone! Processed ${processedCount} images.`);
    console.log('Mapping saved to image_mapping.json');
}

processImages();

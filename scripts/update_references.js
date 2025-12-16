const fs = require('fs');
const path = require('path');

const mappingPath = path.join(process.cwd(), 'image_mapping.json');
if (!fs.existsSync(mappingPath)) {
    console.error('Mapping file not found');
    process.exit(1);
}

const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));

// Prepare replacement pairs
// Mapping keys are 'public/images/...'
const replacements = [];
for (const [oldPath, newPath] of Object.entries(mapping)) {
    // Strategy 1: Absolute path from public root (Next.js standard)
    // public/images/foo.jpg -> /images/foo.jpg
    const oldAbs = '/' + oldPath.replace(/^public\//, '');
    const newAbs = '/' + newPath.replace(/^public\//, '');
    replacements.push({ from: oldAbs, to: newAbs });

    // Strategy 2: Relative path check (rare but possible) or without leading slash
    // images/foo.jpg
    const oldRel = oldPath.replace(/^public\//, '');
    const newRel = newPath.replace(/^public\//, '');
    if (oldRel !== oldAbs) {
        replacements.push({ from: oldRel, to: newRel });
    }
}

// Sort replacements by length descending to avoid partial matches on similar filenames
replacements.sort((a, b) => b.from.length - a.from.length);

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

// Scan src directory
const srcDir = path.join(process.cwd(), 'src');
const filesToScan = walkSync(srcDir);

// Extensions to check
const scanExts = ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss', '.md', '.json', '.astro'];

let changedFiles = 0;

for (const file of filesToScan) {
    if (!scanExts.includes(path.extname(file))) continue;

    let content = fs.readFileSync(file, 'utf8');
    let originalContent = content;

    for (const pair of replacements) {
        if (content.includes(pair.from)) {
            // Global replace
            content = content.split(pair.from).join(pair.to);
        }
    }

    if (content !== originalContent) {
        fs.writeFileSync(file, content);
        console.log(`Updated references in: ${path.relative(process.cwd(), file)}`);
        changedFiles++;
    }
}

console.log(`\nUpdates complete. Modified ${changedFiles} files.`);

const path = require('path');
const fs = require('fs');

/**
 * Resolve path to data directory robustly
 * Handles local development and Vercel serverless environment
 */
const getDataPath = (filename) => {
    const potentialPaths = [
        // Vercel / Serverless environments
        path.join(process.cwd(), 'data', filename),
        path.join(process.cwd(), filename),
        // Local development (src/utils/../../data)
        path.join(__dirname, '../../data', filename),
        // Fallbacks
        path.join(__dirname, '../data', filename),
        path.join(__dirname, 'data', filename)
    ];

    console.log(`[PathUtils] Looking for ${filename} in potential locations...`);
    console.log(`[PathUtils] CWD: ${process.cwd()}`);
    console.log(`[PathUtils] __dirname: ${__dirname}`);

    for (const p of potentialPaths) {
        if (fs.existsSync(p)) {
            console.log(`[PathUtils] Found data at: ${p}`);
            return p;
        }
    }

    // Default to CWD if not found (will likely fail, but provides a path for error message)
    const defaultPath = path.join(process.cwd(), 'data', filename);
    console.log(`[PathUtils] File not found in any location. Defaulting to: ${defaultPath}`);
    return defaultPath;
};


module.exports = { getDataPath };

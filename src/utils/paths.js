const path = require('path');
const fs = require('fs');

/**
 * Resolve path to data directory robustly
 * Handles local development and Vercel serverless environment
 */
const getDataPath = (filename) => {
    const potentialPaths = [
        // Vercel / Serverless environments (Prioritize api/data)
        path.join(process.cwd(), 'api', 'data', filename),
        // Fallback for when process.cwd() is the root (local dev)
        path.join(process.cwd(), 'data', filename),
        // Direct path
        path.join(process.cwd(), filename),
        // Local development relative to this file (src/utils/../../data)
        path.join(__dirname, '../../data', filename),
        // Fallbacks
        path.join(__dirname, '../data', filename)
    ];

    console.log(`[PathUtils] Looking for ${filename}`);
    console.log(`[PathUtils] CWD: ${process.cwd()}`);

    for (const p of potentialPaths) {
        if (fs.existsSync(p)) {
            console.log(`[PathUtils] Found data at: ${p}`);
            return p;
        }
    }

    // Return the Vercel expected path as default even if it doesn't exist logically, 
    // to give a clear error message or in case of read-only fs issues
    const defaultPath = path.join(process.cwd(), 'api', 'data', filename);
    console.log(`[PathUtils] File not found in any location. Defaulting to: ${defaultPath}`);
    return defaultPath;
};


module.exports = { getDataPath };

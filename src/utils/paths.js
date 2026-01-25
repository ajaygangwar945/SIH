const path = require('path');
const fs = require('fs');

/**
 * Resolve path to data directory robustly
 * Handles local development and Vercel serverless environment
 */
const getDataPath = (filename) => {
    // Option 1: Try resolving relative to CWD (Vercel standard)
    const cwdPath = path.join(process.cwd(), 'data', filename);
    if (fs.existsSync(cwdPath)) {
        console.log(`Found data at CWD path: ${cwdPath}`);
        return cwdPath;
    }

    // Option 2: Try resolving relative to __dirname (Local standard)
    // Assuming this file is in src/utils/
    const localPath = path.join(__dirname, '../../data', filename);
    if (fs.existsSync(localPath)) {
        console.log(`Found data at Local path: ${localPath}`);
        return localPath;
    }

    // Fallback: Return CWD path and hope for the best (or let the caller fail)
    console.log(`Data file not found, defaulting to: ${cwdPath}`);
    return cwdPath;
};

module.exports = { getDataPath };

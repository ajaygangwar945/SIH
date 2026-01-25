const AyushFHIRServer = require('../src/server');

// Create a singleton instance
const server = new AyushFHIRServer();
let initialized = false;

// Export the Vercel serverless function handler
module.exports = async (req, res) => {
    // Ensure data is loaded (cold start handling)
    if (!initialized) {
        try {
            await server.loadData();
            initialized = true;
        } catch (error) {
            console.error('Initialization error:', error);
        }
    }

    // Forward request to Express app
    return server.app(req, res);
};

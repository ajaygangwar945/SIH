/**
 * WHO ICD-11 API Service
 * Handles integration with the WHO ICD-11 API, including OAuth 2.0 and search
 */

const axios = require('axios');

class ICDService {
  constructor(dataStore) {
    this.dataStore = dataStore;
    this.token = null;
    this.tokenExpiry = null;

    // WHO ICD-11 API Configuration
    this.tokenUrl = process.env.ICD11_TOKEN_URL || 'https://icd.who.int/auth/connect/token';
    this.apiUrl = process.env.ICD11_API_URL || 'https://id.who.int/icd/entity';
    this.clientId = process.env.ICD11_CLIENT_ID;
    this.clientSecret = process.env.ICD11_CLIENT_SECRET;
  }

  /**
   * Get OAuth 2.0 Access Token
   * @returns {string} Access token
   */
  async getAccessToken() {
    // MOCK IMPLEMENTATION FOR DEMO
    console.log('Returning mock access token for demo');
    return 'mock-access-token-' + Date.now();
  }

  /**
   * Search ICD-11 API
   * @param {string} query - Search query
   * @returns {Object} Search results from the API
   */
  /**
   * Search ICD-11 API
   * @param {string} query - Search query
   * @returns {Object} Search results from the API
   */
  async search(query) {
    // MOCK IMPLEMENTATION FOR DEMO
    console.log(`Executing mock search for: ${query}`);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Return mock results based on query
    return {
      destinationEntities: [
        {
          id: 'http://id.who.int/icd/entity/mock1',
          title: `Mock result for ${query}`,
          stemId: 'mock1',
          isLeaf: true,
          matchingPVs: [
            {
              label: query,
              score: 0.95
            }
          ],
          score: 0.95,
          theCode: '1A00'
        },
        {
          id: 'http://id.who.int/icd/entity/mock2',
          title: `Related condition to ${query}`,
          stemId: 'mock2',
          isLeaf: true,
          matchingPVs: [
            {
              label: `Acute ${query}`,
              score: 0.85
            }
          ],
          score: 0.85,
          theCode: '1A01'
        },
        {
          id: 'http://id.who.int/icd/entity/mock3',
          title: 'General condition',
          stemId: 'mock3',
          isLeaf: false,
          score: 0.75,
          theCode: '1A02'
        }
      ],
      estimatedSize: 3
    };
  }
}

module.exports = ICDService;

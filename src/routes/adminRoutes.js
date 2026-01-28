/**
 * Admin Routes
 * Defines endpoints for data management and administrative tasks
 */

const express = require('express');
const { getDataPath } = require('../utils/paths');
const auditService = require('../services/auditService');

module.exports = (dataStore, csvParser) => {
  const router = express.Router();

  // Ingest CSV data
  router.post('/ingest-csv', async (req, res) => {
    try {
      const { csvData, filePath } = req.body;

      let parseResult;

      if (csvData) {
        // Parse from string data
        parseResult = await csvParser.parseCSVFromString(csvData);
      } else if (filePath) {
        // Parse from file path
        parseResult = await csvParser.parseCSV(filePath);
      } else {
        return res.status(400).json({
          error: 'Either csvData or filePath is required'
        });
      }

      // Store parsed terms
      const storeResult = dataStore.storeTerms(parseResult.terms);

      // Create AuditEvent
      const auditEvent = auditService.createAuditEvent(
        'C', // Create
        '0', // Success
        `Ingested ${storeResult.stored} new terms and updated ${storeResult.updated} terms from CSV`
      );
      console.log('AuditEvent:', JSON.stringify(auditEvent, null, 2));

      // Create Provenance for each new term
      parseResult.terms.forEach(term => {
        const provenance = auditService.createProvenance(
          term.id,
          'Initial ingestion from CSV'
        );
        console.log('Provenance:', JSON.stringify(provenance, null, 2));
      });

      res.json({
        success: parseResult.success,
        parsing: parseResult.summary,
        storage: storeResult,
        errors: parseResult.errors,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({
        error: 'CSV ingestion failed',
        message: error.message
      });
    }
  });

  // Load sample data
  router.post('/load-sample', async (req, res) => {
    try {
      // Use helper to resolve path correctly in Vercel or Local
      const sampleCSVPath = getDataPath('sample-namaste.csv');
      const fs = require('fs');
      const path = require('path');

      // DEBUG: Explicit check for file existence
      if (!fs.existsSync(sampleCSVPath)) {
        console.log(`[DEBUG] File missing at resolved path: ${sampleCSVPath}`);

        // List files in CWD and data directory for debugging
        const cwd = process.cwd();
        const filesInCwd = fs.readdirSync(cwd);

        const dataDir = path.join(cwd, 'data');
        if (fs.existsSync(dataDir)) {
          filesInData = fs.readdirSync(dataDir).join(', ');
        }

        let filesInApiData = 'api/data dir not found';
        const apiDataDir = path.join(cwd, 'api', 'data');
        if (fs.existsSync(apiDataDir)) {
          filesInApiData = fs.readdirSync(apiDataDir).join(', ');
        }

        throw new Error(
          `DEBUG INFO: File not found at ${sampleCSVPath}. ` +
          `CWD: ${cwd}. ` +
          `Files in CWD: [${filesInCwd.join(', ')}]. ` +
          `Files in data: [${filesInData}]. ` +
          `Files in api/data: [${filesInApiData}]`
        );
      }

      const parseResult = await csvParser.parseCSV(sampleCSVPath);
      const storeResult = dataStore.storeTerms(parseResult.terms);

      res.json({
        message: 'Sample data loaded successfully',
        parsing: parseResult.summary,
        storage: storeResult,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Load Sample Error:', error);
      res.status(500).json({
        error: 'Failed to load sample data',
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  });


  // Get statistics
  router.get('/statistics', (req, res) => {
    try {
      const stats = dataStore.getStatistics();
      res.json({
        statistics: stats,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({
        error: 'Failed to retrieve statistics',
        message: error.message
      });
    }
  });

  // Clear all data
  router.delete('/clear', (req, res) => {
    try {
      dataStore.clear();
      res.json({
        message: 'All data cleared successfully',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({
        error: 'Failed to clear data',
        message: error.message
      });
    }
  });

  // Debug: List all files
  router.get('/debug-files', (req, res) => {
    const fs = require('fs');
    const path = require('path');

    function listFiles(dir, depth = 0) {
      if (depth > 3) return ['...depth limit...'];
      let results = [];
      try {
        const list = fs.readdirSync(dir);
        list.forEach(file => {
          const filePath = path.join(dir, file);
          const stat = fs.statSync(filePath);
          if (stat && stat.isDirectory()) {
            if (file !== 'node_modules' && file !== '.git') {
              results = results.concat(listFiles(filePath, depth + 1));
            }
          } else {
            results.push(filePath);
          }
        });
      } catch (e) {
        results.push(`Error reading ${dir}: ${e.message}`);
      }
      return results;
    }

    const allFiles = listFiles(process.cwd());
    res.json({
      cwd: process.cwd(),
      files: allFiles
    });
  });

  return router;
};

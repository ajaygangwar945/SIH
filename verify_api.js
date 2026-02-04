const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

async function verify() {
    console.log('🔍 Starting System Audit...\n');

    try {
        // 1. Health Check
        console.log('1️⃣  Checking Health...');
        const health = await axios.get(`${BASE_URL}/health`);
        console.log(`   ✅ Status: ${health.data.status}`);
        console.log(`   ✅ Version: ${health.data.version}\n`);

        // 2. Admin Statistics (Verify Data Load)
        console.log('2️⃣  Checking Admin Statistics...');
        const stats = await axios.get(`${BASE_URL}/admin/statistics`);
        const totalTerms = stats.data.statistics.totalTerms;
        console.log(`   📊 Total Terms: ${totalTerms}`);
        if (totalTerms > 50) {
            console.log('   ✅ Data loaded successfully (Count > 50).');
        } else {
            console.log('   ⚠️  Warning: Low term count. Sample data might not be loaded.');
        }
        const cacheStats = stats.data.statistics.cacheStats;
        console.log(`   📊 Cache Hits: ${cacheStats.hits}, Misses: ${cacheStats.misses}\n`);

        // 3. Search Verification (Name)
        console.log('3️⃣  Verifying Search by Name ("Yoga")...');
        const searchName = await axios.get(`${BASE_URL}/api/terminology/search?q=Yoga`);
        const yogaResults = searchName.data.results;
        console.log(`   found ${yogaResults.length} results.`);
        if (yogaResults.length > 0) {
            console.log(`   ✅ Top Result: ${yogaResults[0].term.term} (${yogaResults[0].term.id})`);
        } else {
            console.log('   ❌ No results found for "Yoga".');
        }
        console.log('');

        // 4. Search Verification (ID) - NEW FEATURE
        console.log('4️⃣  Verifying Search by ID ("AY016")...');
        const searchId = await axios.get(`${BASE_URL}/api/terminology/search?q=AY016`);
        const idResults = searchId.data.results;
        if (idResults.length > 0) {
            console.log(`   ✅ Success! Found ${idResults[0].term.term} by ID "AY016".`);
        } else {
            console.log('   ❌ Failed to search by ID "AY016".');
        }
        console.log('');

        // 5. Search Verification (ICD-11 Code) - NEW FEATURE
        console.log('5️⃣  Verifying Search by Code ("TM2-AY801")...');
        const searchCode = await axios.get(`${BASE_URL}/api/terminology/search?q=TM2-AY801`);
        const codeResults = searchCode.data.results;
        if (codeResults.length > 0) {
            console.log(`   ✅ Success! Found ${codeResults[0].term.term} by Code "TM2-AY801".`);
        } else {
            console.log('   ❌ Failed to search by Code "TM2-AY801".');
        }

    } catch (error) {
        console.error('❌ Audit Failed:');
        if (error.code === 'ECONNREFUSED') {
            console.error('   Could not connect to server at ' + BASE_URL);
            console.error('   Make sure "npm run dev" is running.');
        } else {
            console.error('   ' + error.message);
            if (error.response) {
                console.error('   Server Response:', error.response.status, error.response.data);
            }
        }
    }
}

verify();

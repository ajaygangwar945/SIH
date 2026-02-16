const fs = require('fs');
const path = require('path');

const OUTPUT_FILE = path.join(__dirname, '../api/data/sample-namaste.csv');
const TARGET_COUNT = 1002; // Header + 1001 rows (to likely get >1000 terms cleanly)

const systems = [
    { prefix: 'AY', name: 'Ayurveda', categories: ['Ayurvedic Disease', 'Ayurvedic Herb', 'Ayurvedic Procedure', 'Ayurvedic Constitutional Disorder', 'Ayurvedic Formulation'] },
    { prefix: 'UN', name: 'Unani', categories: ['Unani Disease', 'Unani Treatment', 'Unani Procedure', 'Unani Temperament'] },
    { prefix: 'SI', name: 'Siddha', categories: ['Siddha Disease', 'Siddha Therapy', 'Siddha Formulation', 'Siddha Constitutional Disorder'] },
    { prefix: 'YO', name: 'Yoga', categories: ['Yoga Practice'] },
    { prefix: 'HO', name: 'Homoeopathy', categories: ['Homoeopathy Remedy'] },
    { prefix: 'NA', name: 'Naturopathy', categories: ['Naturopathy'] }
];

const roots = {
    diseases: ['Fever', 'Pain', 'Cough', 'Cold', 'Inflammation', 'Disorder', 'Syndrome', 'Infection', 'Fracture', 'Wound', 'Ulcer', 'Diabetes', 'Arthritis', 'Asthma', 'Dyspepsia', 'Anemia', 'Jaundice', 'Headache', 'Insomnia', 'Anxiety'],
    adjectives: ['Acute', 'Chronic', 'Severe', 'Mild', 'Reoccurring', 'Seasonal', 'Viral', 'Bacterial', 'Traumatic', 'Congenital', 'Digestive', 'Respiratory', 'Nervous', 'Muscular', 'Skin'],
    herbs: ['Leaf', 'Root', 'Bark', 'Flower', 'Fruit', 'Seed', 'Stem', 'Oil', 'Extract', 'Powder'],
    actions: ['Therapy', 'Treatment', 'Massage', 'Cleansing', 'Purification', 'Detox', 'Healing', 'Balancing', 'Stimulation', 'Relaxation'],
    sanskrit_roots: ['Vata', 'Pitta', 'Kapha', 'Agni', 'Ojas', 'Ama', 'Dhatu', 'Mala', 'Srotas', 'Prana', 'Tejas', 'Vayu', 'Akasha', 'Prithvi', 'Jala'],
    unani_roots: ['Dam', 'Balgham', 'Safra', 'Sauda', 'Mizaj', 'Akhlat', 'Arwah', 'Quwa', 'Afal'],
    siddha_roots: ['Vatham', 'Pitham', 'Kapham', 'Saram', 'Senneer', 'Oon', 'Kozhuppu', 'Enbu', 'Moolai', 'Sukkilam']
};

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

function generateTerm(id, system) {
    const category = getRandom(system.categories);
    let termName = '';
    let description = '';
    let synonyms = '';
    let icdCode = '';
    let references = '';

    // Generate basic data based on category content
    if (category.includes('Disease') || category.includes('Disorder')) {
        const disease = getRandom(roots.diseases);
        const adj = getRandom(roots.adjectives);

        if (system.name === 'Ayurveda') termName = `${getRandom(roots.sanskrit_roots)} ${disease}`;
        else if (system.name === 'Unani') termName = `${getRandom(roots.unani_roots)} ${disease}`;
        else if (system.name === 'Siddha') termName = `${getRandom(roots.siddha_roots)} ${disease}`;
        else termName = `${adj} ${disease}`;

        description = `${adj} ${disease} condition affecting the body systems according to ${system.name} principles.`;
        synonyms = `${adj} ${disease}, ${disease} of ${system.name}`;
    } else if (category.includes('Herb') || category.includes('Remedy') || category.includes('Formulation')) {
        termName = `${system.name} ${getRandom(roots.herbs)} ${Math.floor(Math.random() * 100)}`;
        description = `Medicinal ${category.toLowerCase()} used for therapeutic purposes.`;
        synonyms = `Botanical ${Math.floor(Math.random() * 100)}, Herbal Extract`;
    } else if (category.includes('Procedure') || category.includes('Therapy') || category.includes('Practice') || category.includes('Treatment')) {
        termName = `${system.name} ${getRandom(roots.actions)}`;
        description = `Therapeutic ${category.toLowerCase()} for restoring health and balance.`;
        synonyms = `${getRandom(roots.actions)} Technique, Healing Method`;
    } else {
        termName = `${system.name} Concept ${Math.floor(Math.random() * 500)}`;
        description = `Fundamental concept in ${system.name} medicine.`;
        synonyms = `Traditional Concept, Medical Principle`;
    }

    // Randomize Reference
    const refs = ['Charaka Samhita', 'Sushruta Samhita', 'Canon of Medicine', 'Thirukkural', 'Yoga Sutras', 'Hahnemann', 'Nature Cure'];
    references = getRandom(refs);

    // Generate mock ICD Code roughly 60% of the time, as per stats
    if (Math.random() > 0.4) {
        icdCode = `TM2-${system.prefix}${Math.floor(Math.random() * 900) + 100}`;
    }

    return {
        id: `${system.prefix}${String(id).padStart(3, '0')}`,
        term: termName,
        category: category,
        synonyms: synonyms,
        icd11_tm2_code: icdCode,
        references: references,
        description: description
    };
}

const header = 'id,term,category,synonyms,icd11_tm2_code,references,description';
const rows = [];

// Generate 1000+ rows
let counts = { AY: 1, UN: 1, SI: 1, YO: 1, HO: 1, NA: 1 };

for (let i = 0; i < 1001; i++) {
    const system = getRandom(systems);
    const term = generateTerm(counts[system.prefix]++, system);

    // Escape quotes if needed
    const safeTerm = `"${term.term}"`;
    const safeCat = `"${term.category}"`;
    const safeSyn = `"${term.synonyms}"`;
    const safeDesc = `"${term.description}"`;
    const safeRef = `"${term.references}"`;

    rows.push(`${term.id},${safeTerm},${safeCat},${safeSyn},${term.icd11_tm2_code},${safeRef},${safeDesc}`);
}

const content = [header, ...rows].join('\n');

try {
    // Ensure directory exists
    const dir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(OUTPUT_FILE, content, 'utf8');
    console.log(`Successfully generated ${rows.length} terms to ${OUTPUT_FILE}`);
} catch (err) {
    console.error('Error writing file:', err);
}

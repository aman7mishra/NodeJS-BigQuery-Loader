const uploadToGCS = require('./gcsUploader');
const loadCSVToBigQuery = require('./bigQueryLoader');

async function main() {
    const localFilePath = process.argv[2];
    if (!localFilePath) {
        console.error('Usage: node src/main.js <localFilePath>');
        process.exit(1);
    }

    const schema = [
        { name: 'id', type: 'INTEGER' },
        { name: 'name', type: 'STRING' },
        { name: 'value', type: 'FLOAT' },
        { name: 'timestamp', type: 'TIMESTAMP' },
    ];

    try {
        const fileName = await uploadToGCS(localFilePath);
        await loadCSVToBigQuery(fileName, schema);
        console.log('CSV uploaded and loaded into BigQuery successfully.');
    } catch (error) {
        console.error('Error during execution:', error);
    }
}

main();

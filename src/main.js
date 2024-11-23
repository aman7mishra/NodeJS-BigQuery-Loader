const uploadToGCS = require('./gcsUploader');
const loadCSVToBigQuery = require('./bigQueryLoader');
const { preprocessCSV } = require('./transformation');

async function main() {
    const localFilePath = process.argv[2];
    if (!localFilePath) {
        console.error('Usage: node src/main.js <localFilePath>');
        process.exit(1);
    }

    try {
        // Preprocess the CSV file if needed
        const processedFilePath = preprocessCSV(localFilePath);

        // Upload to GCS
        const fileName = await uploadToGCS(processedFilePath);

        // Load into BigQuery
        await loadCSVToBigQuery(fileName);

        console.log('CSV uploaded and loaded into BigQuery successfully.');
    } catch (error) {
        console.error('Error during execution:', error);
    }
}

main();

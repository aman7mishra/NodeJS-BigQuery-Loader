const { BigQuery } = require('@google-cloud/bigquery');
const path = require('path');
const { projectId, serviceAccountKey, datasetName } = require('./config');

const bigquery = new BigQuery({ projectId, keyFilename: serviceAccountKey });

async function loadCSVToBigQuery(fileName, schema) {
    const tableName = path.basename(fileName, path.extname(fileName));
    const dataset = bigquery.dataset(datasetName);
    const table = dataset.table(tableName);

    const metadata = {
        sourceFormat: 'CSV',
        schema: { fields: schema },
        skipLeadingRows: 1,
        fieldDelimiter: fileName.endsWith('.tsv') ? '\t' : ',',
    };

    const gcsUri = `gs://${bucketName}/${fileName}`;
    try {
        const [job] = await table.load(gcsUri, metadata);
        console.log(`Table ${tableName} loaded successfully. Job: ${job.id}`);
    } catch (error) {
        console.error(`Failed to load CSV to BigQuery: ${error.message}`);
        throw error;
    }
}

module.exports = loadCSVToBigQuery;

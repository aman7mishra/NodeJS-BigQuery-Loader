const { BigQuery } = require('@google-cloud/bigquery');
const { projectId, serviceAccountKey, datasetName } = require('./config');
const { getTableName, getSchema } = require('./transformation');

const bigquery = new BigQuery({ projectId, keyFilename: serviceAccountKey });

async function loadCSVToBigQuery(fileName) {
    const tableName = getTableName(fileName);
    const schema = getSchema();
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

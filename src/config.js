require('dotenv').config();

module.exports = {
    projectId: process.env.GCLOUD_PROJECT,
    bucketName: process.env.GCS_BUCKET,
    datasetName: process.env.BQ_DATASET,
    serviceAccountKey: process.env.SERVICE_ACCOUNT_KEY_PATH,
};

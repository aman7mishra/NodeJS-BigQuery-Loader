const { Storage } = require('@google-cloud/storage');
const path = require('path');
const { projectId, serviceAccountKey, bucketName } = require('./config');

const storage = new Storage({ projectId, keyFilename: serviceAccountKey });

async function uploadToGCS(localFilePath) {
    const fileName = path.basename(localFilePath);
    const bucket = storage.bucket(bucketName);

    try {
        await bucket.upload(localFilePath, { destination: fileName });
        console.log(`File ${fileName} uploaded to GCS bucket ${bucketName}.`);
        return fileName;
    } catch (error) {
        console.error(`Failed to upload file to GCS: ${error.message}`);
        throw error;
    }
}

module.exports = uploadToGCS;

const path = require('path');

/**
 * Derives the BigQuery table name from the file name.
 * @param {string} fileName - Name of the file.
 * @returns {string} - The derived table name.
 */
function getTableName(fileName) {
    return path.basename(fileName, path.extname(fileName));
}

/**
 * Retrieves the schema for BigQuery tables.
 * @returns {Array} - An array of schema objects.
 */
function getSchema() {
    return [
        { name: 'id', type: 'INTEGER' },
        { name: 'name', type: 'STRING' },
        { name: 'value', type: 'FLOAT' },
        { name: 'timestamp', type: 'TIMESTAMP' },
    ];
}

/**
 * Pre-processes CSV data for transformations if needed.
 * (Currently, this is a placeholder for future use.)
 * @param {string} csvFilePath - Path to the local CSV file.
 * @returns {string} - The path to the processed CSV file.
 */
function preprocessCSV(csvFilePath) {
    // Add transformation logic if needed, such as cleaning or validation.
    console.log(`Preprocessing CSV file: ${csvFilePath}`);
    return csvFilePath; // For now, return the original file path.
}

module.exports = {
    getTableName,
    getSchema,
    preprocessCSV,
};

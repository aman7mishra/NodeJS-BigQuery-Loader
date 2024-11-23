README

Overview

This project is a Node.js script designed to upload local CSV files to Google Cloud Storage (GCS) and subsequently load them into a Google BigQuery table. The script supports both comma-separated and tab-separated formats, with a modular structure for easy maintenance and updates.

Features

	1.	Upload CSV to GCS: Uploads a specified local CSV file to a Google Cloud Storage bucket.
	2.	Load to BigQuery: Loads the uploaded file into a BigQuery table.
	3.	Dynamic Table Mapping: Derives the table name from the CSV file name (e.g., data_sales.csv → data_sales).
	4.	Customizable Schema: The BigQuery table schema is defined in the transformation.js module.
	5.	Retry Logic: Implements retry logic for failed operations (default: 2 retries).
	6.	Modular Design: Easily updateable modules for transformation and configurations.

Setup Instructions

1. Prerequisites

	•	Node.js (v16 or higher)
	•	Google Cloud Platform account
	•	Service Account Key with appropriate permissions
	•	Permissions required:
	•	GCS: Storage Object Admin
	•	BigQuery: BigQuery Data Editor
	•	Docker (optional, for containerized execution)

2. Install Dependencies

	1.	Clone the repository:

`git clone <repository-url>
cd project`


2.	Install dependencies:

`npm install`

3. Configure Environment Variables

Create a .env file in the project root and define the following variables:

`GOOGLE_CLOUD_PROJECT_ID=<your-project-id>
GCS_BUCKET_NAME=<your-bucket-name>
BIGQUERY_DATASET_NAME=<your-dataset-name>
SERVICE_ACCOUNT_KEY=<path-to-service-account-key.json>`

Example:

`GOOGLE_CLOUD_PROJECT_ID=my-gcp-project
GCS_BUCKET_NAME=my-bucket
BIGQUERY_DATASET_NAME=my_dataset
SERVICE_ACCOUNT_KEY=/path/to/credentials.json`

4. Run the Script

Direct Execution

1.	Provide the path to a local CSV file:

`node src/main.js <path-to-local-csv-file>`


2.	Example:

`node src/main.js ./sample_data/data_sales.csv`


Dockerized Execution

1.	Build the Docker image:

`docker build -t csv-to-bigquery .`


2.	Run the container:

`docker run --rm \
  -v $(pwd):/usr/src/app \
  --env-file .env \
  csv-to-bigquery <path-to-local-csv-file>`


3.	Example:

`docker run --rm \
  -v $(pwd):/usr/src/app \
  --env-file .env \
  csv-to-bigquery ./sample_data/data_sales.csv`

Transformation Logic

The src/transformation.js module handles all transformations.

Functions

1.	getTableName(fileName):
	•	Maps the CSV file name to a BigQuery table name.
	•	Example: data_sales.csv → data_sales.
2.	getSchema():
	•	Returns a predefined schema for BigQuery.
	•	Example Schema:

`[
    { name: 'id', type: 'INTEGER' },
    { name: 'name', type: 'STRING' },
    { name: 'value', type: 'FLOAT' },
    { name: 'timestamp', type: 'TIMESTAMP' },
]`


3.	preprocessCSV(csvFilePath):
	•	Placeholder for pre-processing logic.
	•	Add transformations like data cleaning or validation here.

Error Handling

	•	Retry logic is implemented for GCS uploads and BigQuery loading operations.
	•	Logs all successes and failures to the console.

Extending the Script

	1.	Update Schema: Modify the getSchema() function in src/transformation.js.
	2.	Change Table Mapping: Update getTableName(fileName) in src/transformation.js.
	3.	Add Pre-processing: Add logic in preprocessCSV(csvFilePath) for tasks like cleaning or validating CSV data.

Troubleshooting

Common Issues

	1.	Permissions Errors:
	•	Ensure the Service Account has the required permissions.
	2.	BigQuery Table Not Found:
	•	Verify that the dataset exists and is correctly named in .env.
	3.	GCS Upload Failures:
	•	Check that the bucket exists and is accessible.

Support

For additional help, feel free to reach out or consult the Google Cloud documentation:
	•	Google Cloud Storage
	•	BigQuery

# Data Ingestion API

A Node.js/Express API for processing data ingestion requests with priority-based batch processing.

## Features
- Priority-based job processing (HIGH > MEDIUM > LOW)
- Batch processing (3 IDs per batch)
- Rate-limited processing (1 batch per 5 seconds)
- Real-time status tracking

## API Endpoints

### POST /ingest
Submit data for ingestion

**Request Body:**
```json
{
  "ids": [1, 2, 3, 4, 5],
  "priority": "HIGH"
}
Trae




I'll help implement the status endpoint. Here's the plan:

Create new files for the status endpoint following the existing architecture:

status.js
statusController.js
statusService.js
Here's the implementation for the status route:

status.js
Apply
const express = require('express');const router = express.Router();const statusController = require('../controllers/statusController');router.get('/:ingestion_id', statusController.getStatus);module.exports = router;
The status controller implementation:
statusController.js
Apply
const statusService = require('../services/statusService');const getStatus = async (req, res) => {  try {    const { ingestion_id } = req.params;    const status = await statusService.getIngestionStatus    (ingestion_id);    res.json(status);  } catch (error) {    res.status(error.status || 500).json({ message: error.    message });  }};module.exports = { getStatus };
The status service implementation:
statusService.js
Apply
const jobStore = require('../store/jobStore');const getIngestionStatus = (ingestionId) => {  const job = jobStore.getJob(ingestionId);  if (!job) {    throw { status: 404, message: 'Job not found' };  }  // Calculate overall status based on batch statuses  const overallStatus = calculateOverallStatus(job.batches);  return {    ingestion_id: ingestionId,    status: overallStatus,    batches: job.batches.map(batch => ({      batch_id: batch.batch_id,      ids: batch.ids,      status: batch.status    }))  };};const calculateOverallStatus = (batches) => {  if (batches.every(b => b.status === 'completed')) return   'completed';  if (batches.some(b => b.status === 'triggered')) return   'triggered';  return 'yet_to_start';};module.exports = { getIngestionStatus };
Update the main index.js to include the new route:
index.js
Apply
// ... existing code ...const statusRouter = require('./routes/status');// ... existing code ...app.use('/status', statusRouter);// ... existing code ...
Would you like me to proceed with implementing any specific part in more detail?

Sarthak SADHOTRA
Copy
Delete
add a readme file for documentation  Brief explanation of your approach and setup instructions.
Trae
Here's a complete README.md file for your data ingestion API:

README.md
Apply
# Data Ingestion APIA Node.js/Express API for processing data ingestion requests with priority-based batch processing.## Features- Priority-based job processing (HIGH > MEDIUM > LOW)- Batch processing (3 IDs per batch)- Rate-limited processing (1 batch per 5 seconds)- Real-time status tracking## API Endpoints### POST /ingestSubmit data for ingestion**Request Body:**```json{  "ids": [1, 2, 3, 4, 5],  "priority": "HIGH"}
Response:

json

{  "ingestion_id": "uuid",  "message": "Ingestion request received"}
GET /status/:ingestion_id
Check ingestion status

Response:

json

{  "ingestion_id": "uuid",  "status": "triggered",  "batches": [    {      "batch_id": "uuid1",      "ids": [1, 2, 3],      "status": "completed"    },    {      "batch_id": "uuid2",      "ids": [4, 5],      "status": "triggered"    }  ]}
Setup Instructions
Clone the repository
Install dependencies:
bash
Run
npm install
Start the server:
bash
Run
node src/index.js
The server will run on http://localhost:3000 by default.

Testing
Example requests using curl:

Submit an ingestion request:

bash
Run
curl -X POST -H "Content-Type: application/json" -d '{"ids":[1,2,3,4,5],"priority":"HIGH"}' http://localhost:3000/ingest
Check status:

bash
Run
curl http://localhost:3000/status/your-ingestion-id
Architecture
The system follows a clean architecture pattern with:

Routes: Handle HTTP requests
Controllers: Process incoming requests
Services: Business logic
Models: Data structures
Queue: Priority-based job processing
Store: In-memory job tracking



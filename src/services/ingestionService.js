const { IngestionJob } = require('../models/ingestionJob');
const { generateId } = require('../utils/uuid');
const { PRIORITY_MAP } = require('../utils/priorityEnum');
const jobQueue = require('../queue/jobQueue');

class IngestionService {
    createJob(ids, priority) {
        const ingestionId = generateId();
        const job = new IngestionJob(ids, PRIORITY_MAP[priority], ingestionId);
        jobQueue.enqueue(job);
        return ingestionId;
    }

    getJobStatus(ingestionId) {
        return jobQueue.getStatus(ingestionId);
    }
}

module.exports = new IngestionService();
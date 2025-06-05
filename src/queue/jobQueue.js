const { Heap } = require('heap-js');

class JobQueue {
    constructor() {
        this.heap = new Heap((a, b) => {
            if (a.priority !== b.priority) {
                return a.priority - b.priority;
            }
            return a.createdTime - b.createdTime;
        });
        this.jobStatus = new Map();
    }

    enqueue(job) {
        this.heap.push(job);
        this.jobStatus.set(job.ingestionId, {
            status: 'pending',
            totalIds: job.ids.length,
            processedIds: [],
            totalProcessed: 0
        });
    }

    dequeue() {
        return this.heap.pop();
    }

    getStatus(ingestionId) {
        return this.jobStatus.get(ingestionId);
    }
}

module.exports = new JobQueue();
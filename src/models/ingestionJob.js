class IngestionJob {
    constructor(ids, priority, ingestionId) {
        this.ids = ids;
        this.priority = priority;
        this.ingestionId = ingestionId;
        this.createdTime = Date.now();
        this.status = 'pending';
    }

    toBatch(batchSize = 3) {
        const batches = [];
        for (let i = 0; i < this.ids.length; i += batchSize) {
            batches.push(this.ids.slice(i, i + batchSize));
        }
        return batches;
    }
}

module.exports = { IngestionJob };
const ingestionService = require('../services/ingestionService');
const { ingestSchema } = require('../validations/ingestSchema');

class IngestController {
    async ingest(req, res) {
        try {
            const { error, value } = ingestSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            const { ids, priority } = value;
            const ingestionId = ingestionService.createJob(ids, priority);
            res.json({ ingestion_id: ingestionId });
        } catch (err) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getStatus(req, res) {
        try {
            const { ingestionId } = req.params;
            const status = ingestionService.getJobStatus(ingestionId);

            if (!status) {
                return res.status(404).json({ error: 'Ingestion ID not found' });
            }

            res.json(status);
        } catch (err) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = new IngestController();
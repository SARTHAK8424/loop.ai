const express = require('express');
const router = express.Router();
const ingestController = require('../controllers/ingestController');

router.post('/ingest', ingestController.ingest.bind(ingestController));
router.get('/status/:ingestionId', ingestController.getStatus.bind(ingestController));

module.exports = router;
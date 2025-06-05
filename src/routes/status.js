const express = require('express');
const router = express.Router();
const statusController = require('../controllers/statusController');

router.get('/:ingestion_id', statusController.getStatus);

module.exports = router;
const statusService = require('../services/statusService');

const getStatus = async (req, res) => {
  try {
    const { ingestion_id } = req.params;
    const status = await statusService.getIngestionStatus(ingestion_id);
    res.json(status);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

module.exports = { getStatus };
const jobStore = require('../store/jobStore');

const getIngestionStatus = (ingestionId) => {
  const job = jobStore.getJob(ingestionId);
  if (!job) {
    throw { status: 404, message: 'Job not found' };
  }

  // Calculate overall status based on batch statuses
  const overallStatus = calculateOverallStatus(job.batches);

  return {
    ingestion_id: ingestionId,
    status: overallStatus,
    batches: job.batches.map(batch => ({
      batch_id: batch.batch_id,
      ids: batch.ids,
      status: batch.status
    }))
  };
};

const calculateOverallStatus = (batches) => {
  if (batches.every(b => b.status === 'completed')) return 'completed';
  if (batches.some(b => b.status === 'triggered')) return 'triggered';
  return 'yet_to_start';
};

module.exports = { getIngestionStatus };
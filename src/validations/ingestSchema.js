const Joi = require('joi');
const { Priority } = require('../utils/priorityEnum');

const ingestSchema = Joi.object({
    ids: Joi.array()
        .items(Joi.number().integer().min(1).max(Math.pow(10, 9) + 7))
        .required(),
    priority: Joi.string()
        .valid(...Object.values(Priority))
        .required()
});

module.exports = { ingestSchema };
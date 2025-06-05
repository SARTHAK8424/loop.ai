const Priority = {
    HIGH: 'HIGH',
    MEDIUM: 'MEDIUM',
    LOW: 'LOW'
};

const PRIORITY_MAP = {
    [Priority.HIGH]: 1,
    [Priority.MEDIUM]: 2,
    [Priority.LOW]: 3
};

module.exports = { Priority, PRIORITY_MAP };
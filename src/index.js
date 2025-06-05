const express = require('express');
const ingestRoutes = require('./routes/ingest');
const statusRouter = require('./routes/status');

const app = express();
app.use(express.json());

app.use('/', ingestRoutes);
app.use('/status', statusRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
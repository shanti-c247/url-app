const express = require('express');
const urlRoutes = require('./routes/url.routes')
const app = express();
const logger = require('./logger/logger')
app.use(express.json())

app.use("/api", urlRoutes);
logger.error('Error from server');
logger.warn('Alert to run server');
logger.debug('check log')
app.listen(process.env.PORT, () => {
    logger.info("Server running on port 3000");
})
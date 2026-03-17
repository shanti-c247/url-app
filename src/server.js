const express = require('express');
const cors = require('cors')
const helmet = require("helmet");
const app = express();
const path=require('path')
const urlRoutes = require('./routes/url.routes')
const logger = require('./logger/logger')
app.use(express.json())
app.use(
    cors({
        origin: "*",
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        credentials: true,
    }),
);


app.use(
  helmet({
    contentSecurityPolicy: false
  })
);

// ✅ Serve static frontend
app.use("/app",express.static(path.join(__dirname, "../public")));

// Serve API documentation
app.use("/docs", express.static(path.join(__dirname, "../apidoc")));

app.get("/", (req, res) => {
    res.send("Server running");
});

app.use("/api", urlRoutes);
logger.error('Error from server');
logger.warn('Alert to run server');
logger.debug('check log')
app.listen(process.env.PORT, () => {
    logger.info("Server running on port 8000");
})
const pino = require("pino");
const path = require("path");
const fs = require("fs");

const logDir = path.join(__dirname, "..", "..", "app-logs");

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const getLogFileName = () => {
  const date = new Date();
  const pad = (n) => n.toString().padStart(2, "0");

  const formatted =
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

  return path.join(logDir, `url-app-log-${formatted}.log`);
};

const logger = pino({
  level: "info",

  timestamp: () => {
    const date = new Date();
    const pad = (n) => n.toString().padStart(2, "0");

    const formatted =
      `${pad(date.getDate())}-${pad(date.getMonth() + 1)}-${date.getFullYear()} ` +
      `${pad(date.getHours())}:${pad(date.getMinutes())}`;

    return `,"time":"${formatted}"`;
  },

  transport: {
    targets: [
      {
        target: "pino/file",
        options: {
          destination: getLogFileName(),
          mkdir: true
        }
      },
      {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: false
        }
      }
    ]
  }
});

module.exports = logger;
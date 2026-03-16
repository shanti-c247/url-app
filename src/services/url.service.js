const db = require("../database/db");
const generateShortCode = require("../utils/generateCode");

async function createShortUrl(originalUrl) {
  const code = generateShortCode();

  await db.execute(
    "INSERT INTO urls (original_url, short_code) VALUES (?, ?)",
    [originalUrl, code]
  );

  return code;
}

async function getOriginalUrl(code) {
  const [rows] = await db.execute(
    "SELECT original_url FROM urls WHERE short_code = ?",
    [code]
  );

  return rows[0];
}

module.exports = {
  createShortUrl,
  getOriginalUrl,
};
const db = require("../database/db");
const logger = require("../logger/logger");
const generateShortCode = require("../utils/generateCode");


// Create a short URL
async function createShortUrl(originalUrl) {
  const code = generateShortCode();
  const query = `
    INSERT INTO urls (original_url, short_code)
    VALUES ($1, $2)
    RETURNING *;
  `;
  try {
    const res = await db.query(query, [originalUrl, code]);
    logger.info('Short URL created:', res.rows[0]);
    return code;
  } catch (error) {
    logger.error('Error creating short URL:', error);
    throw error;
  }
}

// Get original URL by short code
async function getOriginalUrl(code) {
  const query = `
    SELECT original_url
    FROM public.urls
    WHERE short_code = $1
    LIMIT 1;
  `;

  try {
    const res = await db.query(query, [code]);
    return res.rows[0] || null;
  } catch (error) {
    logger.error('Error fetching original URL:', error);
    throw error;
  }
}

module.exports = {
  createShortUrl,
  getOriginalUrl,
};
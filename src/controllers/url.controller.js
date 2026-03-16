const urlService = require("../services/url.service");

/**
 * @api {post} /shorten Create Short URL
 * @apiName CreateShortUrl
 * @apiGroup URL
 * @apiVersion 1.0.0
 *
 * @apiDescription Create a shortened URL from a long URL.
 *
 * @apiSampleRequest http://localhost:3000
 *
 * @apiBody {String} url Original long URL to shorten.
 *
 * @apiParamExample {json} Request Example:
 * {
 *   "url": "https://google.com"
 * }
 *
 * @apiSuccess {String} shortUrl Generated short URL.
 *
 * @apiSuccessExample {json} Success Response:
 * HTTP/1.1 200 OK
 * {
 *   "shortUrl": "http://localhost:3000/Ab3Xk9"
 * }
 *
 * @apiError (BadRequest) {String} message Invalid URL.
 *
 * @apiErrorExample {json} Bad Request:
 * HTTP/1.1 400 Bad Request
 * {
 *   "message": "URL is required"
 * }
 *
 * @apiErrorExample {json} Server Error:
 * HTTP/1.1 500 Internal Server Error
 * {
 *   "message": "Failed to create short URL"
 * }
 */
exports.shortenUrl = async (req, res) => {
  try {
    const { url } = req.body;
console.log(url);

    if (!url) {
      return res.status(400).json({
        message: "URL is required",
      });
    }

    const code = await urlService.createShortUrl(url);

    res.status(200).json({
      shortUrl: `http://localhost:3000/${code}`,
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to create short URL",
      error: error.message,
    });
  }
};

/**
 * @api {get} /:code Redirect Short URL
 * @apiName RedirectShortUrl
 * @apiGroup URL
 * @apiVersion 1.0.0
 *
 * @apiDescription Redirects a short URL to the original URL.
 *
 * @apiSampleRequest http://localhost:3000
 *
 * @apiParam {String} code Short URL code.
 *
 * @apiParamExample {json} Example:
 * {
 *   "code": "Ab3Xk9"
 * }
 *
 * @apiSuccessExample {text} Redirect Response:
 * HTTP/1.1 302 Found
 * Redirects user to original URL
 *
 * @apiError (NotFound) {String} message URL not found.
 *
 * @apiErrorExample {json} URL Not Found:
 * HTTP/1.1 404 Not Found
 * {
 *   "message": "URL not found"
 * }
 *
 * @apiErrorExample {json} Server Error:
 * HTTP/1.1 500 Internal Server Error
 * {
 *   "message": "Failed to redirect URL"
 * }
 */
exports.redirectUrl = async (req, res) => {
  try {
    const { code } = req.params;
console.log(code);

    const result = await urlService.getOriginalUrl(code);

    if (!result) {
      return res.status(404).json({
        message: "URL not found",
      });
    }

    res.redirect(result.original_url);

  } catch (error) {
    res.status(500).json({
      message: "Failed to redirect URL",
      error: error.message,
    });
  }
};
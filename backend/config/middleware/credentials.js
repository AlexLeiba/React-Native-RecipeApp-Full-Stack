const whitelistOrigins = require("../whiteListOrigins");
function credentials(req, res, next) {
  const origin = req?.headers.origin; //the domain from which the request is coming.

  if (origin && whitelistOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", true); // allow cookies to be sent from frontend to backend.
    // Overwriting the response headers with Access-Control-Allow-Credentials: true
  }
  next();
}

module.exports = { credentials };

const cors = require("cors");

const ALLOWED_ORIGINS = ["http://localhost:4200", "https://app-url"];

const corsOptions = {
  origin: (origin, callback) => {
    if (ALLOWED_ORIGINS.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;

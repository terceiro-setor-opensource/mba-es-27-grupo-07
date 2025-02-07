const functions = require("firebase-functions");
const corsMiddleware = require("./middlewares/corsMiddleware");
const authenticateMiddleware = require("./middlewares/authMiddleware");
const { applyMiddlewares } = require("./utils");

const { createUserWithDetails } = require("./createUser.js");
const { createAds } = require("./createAds.js");
const { updateAds } = require("./updateAds.js");
const { listUserAds } = require("./listUserAds.js");
const { getUserAds } = require("./getUserAds.js");
const { listAds } = require("./listAds.js");

exports.createUserWithDetails = functions.https.onRequest(
  applyMiddlewares([corsMiddleware], createUserWithDetails),
);

exports.createAds = functions.https.onRequest(
  applyMiddlewares([corsMiddleware, authenticateMiddleware], createAds),
);

exports.updateAds = functions.https.onRequest(
  applyMiddlewares([corsMiddleware, authenticateMiddleware], updateAds),
);

exports.listUserAds = functions.https.onRequest(
  applyMiddlewares([corsMiddleware, authenticateMiddleware], listUserAds),
);

exports.getUserAds = functions.https.onRequest(
  applyMiddlewares([corsMiddleware, authenticateMiddleware], getUserAds),
);

exports.listAds = functions.https.onRequest(
  applyMiddlewares([corsMiddleware, authenticateMiddleware], listAds),
);

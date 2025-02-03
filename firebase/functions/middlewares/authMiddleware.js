const { getAuth } = require("../utils/firebase");
const logger = require("firebase-functions/logger");
const auth = getAuth();

const treatUnauthorizedResponse = (res) => {
  return res.status(401).send({ message: "Usuário não atenticado.", statusCode: "unauthorized" });
};

const authenticateMiddleware = async (req, res, next) => {
  try {
    const idToken = req.headers.authorization ? req.headers.authorization.split("Bearer ")[1] : "";

    if (!idToken) {
      return treatUnauthorizedResponse(res);
    }

    try {
      const decodedToken = await auth.verifyIdToken(idToken);
      req.user = decodedToken;
      req.userId = decodedToken.uid;
      next();
    } catch (error) {
      logger.error("Erro ao validar token usuário: ", error);
      return treatUnauthorizedResponse(res);
    }
  } catch (error) {
    return res.status(500).send({ message: "Erro ao autenticar usuário.", statusCode: "error" });
  }
};

module.exports = authenticateMiddleware;

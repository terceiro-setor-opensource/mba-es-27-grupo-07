const { getStorage } = require("../utils/firebase");
const logger = require("firebase-functions/logger");

const getFileSignedUrl = async (filePath) => {
  try {
    const storage = getStorage();
    const file = storage.bucket().file(filePath);

    const oneYearExpirationDate = Date.now() + 365 * 24 * 60 * 60 * 1000;
    const [url] = await file.getSignedUrl({
      action: "read",
      expires: oneYearExpirationDate,
    });

    return url;
  } catch (error) {
    logger.error("Erro ao criar URL assinada: ", error);

    return "";
  }
};

module.exports = { getFileSignedUrl };

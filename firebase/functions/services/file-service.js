const { getStorage } = require("../utils/firebase");
const logger = require("firebase-functions/logger");

const getFilePublicUrl = (filePath) => {
  try {
    const storage = getStorage();
    const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${storage.bucket().name}/o/${encodeURIComponent(filePath)}?alt=media`;

    return publicUrl;
  } catch (error) {
    logger.error("Erro ao criar URL publica: ", error);

    return "";
  }
};

// obtivemos erro, pois a URL assinada expirou em um intervalo de uma semana. Foi necessario substituir pela funcao getFilePublicUrl
const getFileSignedUrl = async (filePath) => {
  try {
    const storage = getStorage();
    const file = storage.bucket().file(filePath);

    const tenYearsExpirationDate = Date.now() + 10 * 365 * 24 * 60 * 60 * 1000;
    const tenYearsMaxAge = 315360000;
    const [url] = await file.getSignedUrl({
      action: "read",
      expires: tenYearsExpirationDate,
      responseCacheControl: `public, max-age=${tenYearsMaxAge}`,
    });

    return url;
  } catch (error) {
    logger.error("Erro ao criar URL assinada: ", error);

    return "";
  }
};

module.exports = { getFileSignedUrl, getFilePublicUrl };

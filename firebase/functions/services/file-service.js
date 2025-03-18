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

module.exports = { getFilePublicUrl };

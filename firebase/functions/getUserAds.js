const { getFirestore } = require("./utils/firebase");
const logger = require("firebase-functions/logger");
const { getFileSignedUrl } = require("./services/file-service");

const db = getFirestore();

exports.getUserAds = async (req, res) => {
  try {
    if (req.method !== "GET") {
      return res.status(405).send({ message: "Método não permitido", statusCode: "error" });
    }

    const userId = req.userId;
    const adsId = req.path.split("/").pop();

    if (!adsId) {
      return res
        .status(400)
        .send({ message: "ID do usuário não fornecido", statusCode: "invalid-argument" });
    }

    const adDoc = await db.collection("ads").doc(adsId).get();

    if (!adDoc.exists) {
      return res.status(404).send({ message: "Anúncio não encontrado", statusCode: "not-found" });
    }

    const adData = adDoc.data();

    if (adData.user_id.path !== `users/${userId}`) {
      return res.status(403).send({ message: "Acesso negado", statusCode: "forbidden" });
    }

    delete adData.user_id;
    const fileUrl = await getFileSignedUrl(adData.filePath);

    const createdDate = adData.createAt.toDate().toISOString();
    const updatedDate = adData.updateAt.toDate().toISOString();
    const ads = { ...adData, id: adDoc.id, fileUrl, createAt: createdDate, updateAt: updatedDate };

    res.status(200).json({ ads, message: "Anúncio recuperado com sucesso", statusCode: "success" });
  } catch (error) {
    logger.error("Erro ao buscar anúncio:", error);

    return res.status(500).send({ message: "Erro ao buscar anúncio", statusCode: "error" });
  }
};

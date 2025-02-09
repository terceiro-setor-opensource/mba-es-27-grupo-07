const { getFirestore } = require("./utils/firebase");
const logger = require("firebase-functions/logger");

const db = getFirestore();

exports.getAds = async (req, res) => {
  try {
    if (req.method !== "GET") {
      return res.status(405).send({ message: "Método não permitido", statusCode: "error" });
    }

    const adsId = req.path.split("/").pop();

    if (!adsId) {
      return res
        .status(400)
        .send({ message: "ID do anúncio não fornecido", statusCode: "invalid-argument" });
    }

    const adDoc = await db.collection("ads").doc(adsId).get();

    if (!adDoc.exists) {
      return res.status(404).send({ message: "Anúncio não encontrado", statusCode: "not-found" });
    }

    const adData = adDoc.data();

    const userRef = adData.user_id;
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).send({ message: "Usuário não encontrado", statusCode: "not-found" });
    }

    const userData = userDoc.data();

    delete adData.user_id;

    const createdDate = adData.createAt.toDate().toISOString();
    const updatedDate = adData.updateAt.toDate().toISOString();
    const ads = { ...adData, id: adDoc.id, createAt: createdDate, updateAt: updatedDate };

    res.status(200).json({
      data: { ads, user: userData },
      message: "Anúncio recuperado com sucesso",
      statusCode: "success",
    });
  } catch (error) {
    logger.error("Erro ao buscar anúncio:", error);

    return res.status(500).send({ message: "Erro ao buscar anúncio", statusCode: "error" });
  }
};

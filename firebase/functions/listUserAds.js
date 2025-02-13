const { getFirestore } = require("./utils/firebase");
const logger = require("firebase-functions/logger");

const db = getFirestore();

exports.listUserAds = async (req, res) => {
  try {
    if (req.method !== "GET") {
      return res.status(405).send({ message: "Método não permitido", statusCode: "error" });
    }

    const userId = req.userId;

    if (!userId) {
      return res
        .status(400)
        .send({ message: "ID do usuário não fornecido", statusCode: "invalid-argument" });
    }

    const adsSnapshot = await db
      .collection("ads")
      .where("user_id", "==", db.collection("users").doc(userId))
      .get();

    if (adsSnapshot.empty) {
      return res
        .status(404)
        .send({ message: "Nenhum anúncio encontrado para este usuário", statusCode: "not-found" });
    }

    const adsList = [];

    adsSnapshot.forEach((doc) => {
      const data = doc.data();
      delete data.user_id;
      if (data.searchTitleIndex) delete data.searchTitleIndex;
      const createdDate = data.createAt.toDate().toISOString();
      const updatedDate = data.updateAt.toDate().toISOString();
      adsList.push({ ...data, id: doc.id, createAt: createdDate, updateAt: updatedDate });
    });

    res
      .status(200)
      .json({ adsList, message: "Anúncios recuperados com sucesso", statusCode: "success" });
  } catch (error) {
    logger.error("Erro ao buscar anúncios:", error);

    return res.status(500).send({ message: "Erro ao buscar anúncios", statusCode: "error" });
  }
};

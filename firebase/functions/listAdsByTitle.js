const { getFirestore } = require("./utils/firebase");
const logger = require("firebase-functions/logger");
const irrelevantWords = require("./constants/irrelevant-words");

const db = getFirestore();

exports.listAdsByTitle = async (req, res) => {
  try {
    if (req.method !== "GET") {
      return res.status(405).send({ message: "Método não permitido", statusCode: "error" });
    }

    const userId = req.userId;
    const title = req.query.title;

    if (!title) {
      return res
        .status(400)
        .send({ message: "Título não fornecido", statusCode: "invalid-argument" });
    }

    const splitTitleList = title
      .split(" ")
      .filter((word) => !irrelevantWords.includes(word.toLowerCase()));

    const adsSnapshotList = [];
    for (let i = 0; i < splitTitleList.length; i++) {
      const splitTitle = splitTitleList[i];

      const adsSnapshot = await db
        .collection("ads")
        .where("searchTitleIndex", "array-contains", splitTitle.toLowerCase())
        .orderBy("updateAt", "desc")
        .get();

      if (adsSnapshot.empty) {
        continue;
      }

      adsSnapshotList.push(adsSnapshot);
    }

    if (adsSnapshotList.length === 0) {
      return res
        .status(404)
        .send({ message: "Nenhum anúncio encontrado para este usuário", statusCode: "not-found" });
    }

    const adsList = [];

    for (let i = 0; i < adsSnapshotList.length; i++) {
      const adsSnapshot = adsSnapshotList[i];

      adsSnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.user_id.id !== userId) {
          delete data.user_id;
          if (data.searchTitleIndex) delete data.searchTitleIndex;
          const createdDate = data.createAt.toDate().toISOString();
          const updatedDate = data.updateAt.toDate().toISOString();
          const ad = { ...data, id: doc.id, createAt: createdDate, updateAt: updatedDate };
          const existingAd = adsList.find((existingAd) => existingAd.id === ad.id);

          if (!existingAd) {
            adsList.push(ad);
          }
        }
      });
    }

    res
      .status(200)
      .json({ adsList, message: "Anúncios recuperados com sucesso", statusCode: "success" });
  } catch (error) {
    logger.error("Erro ao buscar anúncios:", error);

    return res.status(500).send({ message: "Erro ao buscar anúncios", statusCode: "error" });
  }
};

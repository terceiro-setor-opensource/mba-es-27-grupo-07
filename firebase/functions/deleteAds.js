const { getFirestore } = require("./utils/firebase");
const logger = require("firebase-functions/logger");

const db = getFirestore();

exports.deleteAds = async (req, res) => {
  try {
    if (req.method !== "DELETE") {
      return res.status(405).send({ message: "Método não permitido", statusCode: "error" });
    }

    const adsId = req.path.split("/").pop();

    if (!adsId) {
      logger.error("ID don anúncio não fornecido");

      return res
        .status(400)
        .send({ message: "ID don anúncio não fornecido", statusCode: "invalid-argument" });
    }

    const adRef = db.collection("ads").doc(adsId);
    await adRef.delete();

    res.status(200).send({ message: "Anúncio apagado com sucesso.", statusCode: "success" });
  } catch (error) {
    logger.error("Erro ao deletar anúncio: ", error);

    return res.status(500).send({ message: "Erro ao apagar anúncio.", statusCode: "error" });
  }
};

const { getFirestore, FieldValue } = require("./utils/firebase");
const logger = require("firebase-functions/logger");
const { getFileSignedUrl } = require("./services/file-service");

const db = getFirestore();

exports.updateAds = async (req, res) => {
  try {
    if (req.method !== "PUT") {
      return res.status(405).send({ message: "Método não permitido", statusCode: "error" });
    }

    const adsId = req.path.split("/").pop();
    const data = req.body;

    const requiredFields = ["title", "description", "price", "status", "filePath"];

    if (!requiredFields.every((field) => data[field])) {
      logger.error("Dados incompletos: ", data);

      return res.status(400).send({ message: "Dados incompletos", statusCode: "invalid-argument" });
    }

    const adRef = db.collection("ads").doc(adsId);

    await adRef.update({
      title: data.title,
      description: data.description,
      price: data.price,
      status: data.status,
      filePath: data.filePath,
      updateAt: FieldValue.serverTimestamp(),
    });

    const url = await getFileSignedUrl(data.filePath);
    const updatedDate = new Date().toISOString();

    const ads = { ...data, id: adsId, fileUrl: url, updateAt: updatedDate };

    res
      .status(200)
      .json({ ads, message: "Anúncio atualizado com sucesso.", statusCode: "success" });
  } catch (error) {
    logger.error("Erro ao atualizar anúncio:", error);

    return res.status(500).send({ message: "Erro ao atualizar anúncio.", statusCode: "error" });
  }
};

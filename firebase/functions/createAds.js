const { getFirestore } = require("./firebase");
const logger = require("firebase-functions/logger");
const { getFileSignedUrl } = require("./services/file-service");

const db = getFirestore();

exports.createAds = async (req, res) => {
  try {
    if (req.method !== "POST") {
      return res.status(405).send({ message: "Método não permitido", statusCode: "error" });
    }

    const data = req.body;

    const requiredFields = ["title", "description", "price", "status", "filePath"];

    if (!requiredFields.every((field) => data[field])) {
      logger.error("Dados incompletos: ", data);

      return res.status(400).send({ message: "Dados incompletos", statusCode: "invalid-argument" });
    }

    const userId = req.userId;

    const adRef = await db.collection("ads").add({
      title: data.title,
      description: data.description,
      price: data.price,
      status: data.status,
      filePath: data.filePath,
      user_id: db.collection("users").doc(userId),
    });

    const adId = adRef.id;
    const url = await getFileSignedUrl(data.filePath);

    const ads = { ...data, id: adId, fileUrl: url };

    res.status(201).json({ ads, message: "Anúncio criado com sucesso.", statusCode: "success" });
  } catch (error) {
    logger.error("Erro ao criar anúncio:", error);

    return res.status(500).send({ message: "Erro ao criar anúncio.", statusCode: "error" });
  }
};

const { getFirestore, getAuth } = require("./firebase");
const functions = require("firebase-functions");
const logger = require("firebase-functions/logger");

const db = getFirestore();
const auth = getAuth();

exports.createUserWithDetails = async (req, res) => {
  try {
    if (req.method !== "POST") {
      return res.status(405).send("Método não permitido");
    }

    const data = req.body;

    logger.info("Dados recebidos email:", data.email);
    if (!data.email || !data.password || !data.name) {
      logger.error("user payload:", data);

      throw new functions.https.HttpsError("invalid-argument", "Dados incompletos");
    }

    const userRecord = await auth.createUser({
      email: data.email,
      password: data.password,
    });

    await db
      .collection("users")
      .doc(userRecord.uid)
      .set({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        address: data.address,
      });

    const user = { ...data, uid: userRecord.uid };

    delete user.password;

    res.status(201).json({ user, message: "Usuário criado com sucesso.", statusCode: "success" });
  } catch (error) {
    logger.error("Erro ao criar usuário:", error);

    if (error.code === "auth/email-already-in-use") {
      return res
        .status(409)
        .send({ message: "Este email já está em uso.", statusCode: "auth/email-already-in-use" });
    }

    if (error.code === "auth/weak-password") {
      return res
        .status(400)
        .send({ message: "Critérios da senha não atendidos.", statusCode: "auth/weak-password" });
    }

    return res.status(500).send({ message: "Erro ao criar usuário.", statusCode: "error" });
  }
};

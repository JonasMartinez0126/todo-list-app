const mongoose = require("mongoose");

async function connectToDatabase() {
  try {
    const conn =await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB Conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error("Error al conectar a MongoDB Atlas:", error);
    process.exit(1);
  }
}

module.exports = connectToDatabase;
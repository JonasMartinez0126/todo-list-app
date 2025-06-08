const mongoose = require("mongoose"); // Importa mongoose para manejar la conexión a MongoDB

// Función asíncrona para conectar a la base de datos
async function connectToDatabase() {
  try {
    // Intenta conectar a MongoDB usando la URL de conexión desde las variables de entorno
    const conn = await mongoose.connect(process.env.MONGO_URL);
    // Si la conexión es exitosa, muestra el host conectado en consola
    console.log(`MongoDB Conectado: ${conn.connection.host}`);
  } catch (error) {
    // Si ocurre un error, lo muestra en consola y termina el proceso
    console.error("Error al conectar a MongoDB Atlas:", error);
    process.exit(1);
  }
}

// Exporta la función para ser utilizada en otros archivos
module.exports = connectToDatabase;
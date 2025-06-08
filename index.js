const express = require("express"); // Framework principal para el servidor
const path = require('path'); // Módulo para manejar rutas de archivos
const dotenv = require('dotenv'); // Cargar variables de entorno desde .env
const coneccionDB = require('./database/config'); // Función para conectar a la base de datos
const bodyParser = require("body-parser"); // Middleware para parsear el cuerpo de las peticiones
const rutas = require("./routes"); // Importa las rutas de la aplicación
const cors = require("cors"); // Middleware para habilitar CORS

dotenv.config(); // Carga las variables de entorno

// Conectar a MongoDB
coneccionDB();

const app = express(); // Crear la aplicación de Express
const puerto = process.env.PORT || 5000; // Puerto del servidor

// Body parser, para leer datos en formato JSON y formularios
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true }));

// Habilitar CORS para permitir peticiones de otros orígenes
app.use(cors());s

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, './public')));

// Usar las rutas definidas para el recurso /tareas
app.use("/tareas", rutas());

// Iniciar el servidor en el puerto especificado
app.listen(puerto, () => {
  console.log(`Servidor escuchando en http://localhost:${puerto}`);
});

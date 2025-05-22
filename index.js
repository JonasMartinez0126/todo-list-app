const express = require("express");
const dotenv = require('dotenv');
const coneccionDB = require('./database/config');
const bodyParser = require("body-parser");
const rutas = require("./routes");
const cors = require("cors");// CORS permite que un cliente se conecte a otro servidor para el intercambio de recursos

dotenv.config();
// conectar a mongoDB
coneccionDB();

const app = express();// crear el servidor
const puerto = process.env.PORT || 5000; // asignar puerto

//middlewares
app.use(cors());// habilitar CORS

// habilitar body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// rutas de la app
app.use("/tareas", rutas());

// Inicia el servidor en el puerto especificado
app.listen(puerto, () => {
  console.log(`Servidor escuchando en http://localhost:${puerto}`);
});

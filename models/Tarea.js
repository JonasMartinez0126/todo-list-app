const mongoose = require("mongoose"); // Importa mongoose para definir el esquema
const Schema = mongoose.Schema;

// Define el esquema de la colección Tarea
const tareaSchema = new Schema({
  // Título de la tarea (obligatorio, sin espacios al inicio/final)
  titulo: {
    type: String,
    required: true,
    trim: true,
  },
  // Descripción de la tarea (opcional, sin espacios al inicio/final)
  descripcion: {
    type: String,
    trim: true,
    default: ''
  },
  // Estado de la tarea: true = completada, false = pendiente
  estado: {
    type: Boolean,
    default: false,
  },
  // Fecha de creación de la tarea
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
  // Fecha de última actualización de la tarea
  actualizado: {
    type: Date,
    default: Date.now,
  },
});

// Exporta el modelo Tarea para usarlo en otros archivos
module.exports = mongoose.model('Tarea', tareaSchema);

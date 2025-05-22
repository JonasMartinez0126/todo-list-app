const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tareaSchema = new Schema({
  titulo: {
    type: String,
    required: true,
    trim: true,
  },
  descripcion: {
    type: String,
    trim: true,
    default: ''
  },
  estado: {
    type: Boolean,
    default: false,
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
  actualizado: {
    type: Date,
    default: Date.now,
},
});

module.exports = mongoose.model('Tarea', tareaSchema);

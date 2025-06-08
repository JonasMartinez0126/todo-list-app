const express = require('express');
const router = express.Router();

// Importa el controlador de tareas
const tareaController = require('../controllers/TareaController');

// Ruta para obtener todas las tareas (GET /)
router.get('/', tareaController.getTodasTareas); // obtener todas las tareas

// Ruta para crear una nueva tarea (POST /)
router.post('/', tareaController.crearTarea); // crear una tarea

// Ruta para obtener una tarea por ID (GET /:id)
router.get('/:id', tareaController.getTareaID); // obtener una tarea

// Ruta para actualizar una tarea por ID (PUT /:id)
router.put('/:id', tareaController.actualizarTarea); // actualizar una tarea

// Ruta para eliminar una tarea por ID (DELETE /:id)
router.delete('/:id', tareaController.eliminarTarea); // eliminar una tarea

// Exporta una función que retorna el router configurado
module.exports = function() {
    return router;
}
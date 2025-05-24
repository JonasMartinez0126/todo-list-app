const express = require('express');
const router = express.Router();

const tareaController = require('../controllers/TareaController');

    router.get('/', tareaController.getTodasTareas)// obtener todas las tareas
    router.post('/', tareaController.crearTarea); // crear una tarea
    router.get('/:id',tareaController.getTareaID)// obtener una tarea
    router.put('/:id',tareaController.actualizarTarea)// actualizar una tarea
    router.delete('/:id', tareaController.eliminarTarea);// eliminar una tarea

module.exports = function() {
    return router;
}
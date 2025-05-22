const express = require('express');
const router = express.Router();

const tareaController = require('../controllers/TareaController');

module.exports = function() {

    router.route('/')
    .get(tareaController.getTodasTareas)// obtener todas las tareas
    .post(tareaController.crearTarea); // crear una tarea

    router.route('/:id')
    .get(tareaController.getTareaID)// obtener una tarea
    .put(tareaController.actualizarTarea)// actualizar una tarea
    .delete(tareaController.eliminarTarea);// eliminar una tarea

    return router;
}
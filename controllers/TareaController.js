const Tarea = require('../models/Tarea');


// Se obtiene todas las tareas
// route   GET /tareas
// access  Public
exports.getTodasTareas = async (req, res) => {
    try {
        const tareas = await Tarea.find().sort({ estado: -1, fechaCreacion: -1 });// se ordena por estado y fecha de creación
        if (!tareas || tareas.length === 0) {
            return res.status(404).json({ message: 'No se encontraron tareas' });
        }
        res.status(200).json(tareas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Se obtiene la tarea con el ID del mismo
// route   GET /tareas/:id
// access  Public
exports.getTareaID = async (req, res) => {
    try {
        const tarea = await Tarea.findById(req.params.id);
        if (!tarea) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        res.status(200).json(tarea);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear una nueva tarea
// route   POST /tareas
// access  Public
exports.crearTarea = async (req, res) => {
    try {
        const { titulo, descripcion } = req.body;
        if (!titulo) {
            return res.status(400).json({ message: 'El título es requerido' });
        }
        const nuevaTarea = new Tarea({ titulo, descripcion });
        const tareaGuardada = await nuevaTarea.save();
        res.status(201).json(tareaGuardada);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar tarea con el ID
// route   PUT /tareas/:id
// access  Public
exports.actualizarTarea = async (req, res) => {
    try {
        const tarea = await Tarea.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // Devuelve el documento modificado
            runValidators: true, // Ejecuta las validaciones del esquema
        });
        if (!tarea) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        res.status(200).json(tarea);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Elimina una tarea con el ID
// route   DELETE /tareas/:id
// access  Public
exports.eliminarTarea = async (req, res) => {
    try {
        const tarea = await Tarea.findByIdAndDelete(req.params.id);
        if (!tarea) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        res.status(204).send(); // 204 No Content para eliminación exitosa
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


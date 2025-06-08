const Tarea = require('../models/Tarea'); // Importa el modelo de Tarea

// ==========================
// Obtener todas las tareas
// route   GET /tareas
// access  Public
// ==========================
exports.getTodasTareas = async (req, res) => {
    try {
        // Busca todas las tareas y las ordena: primero las hechas, luego por fecha de creación descendente
        const tareas = await Tarea.find().sort({ estado: -1, fechaCreacion: -1 });
        if (!tareas || tareas.length === 0) {
            return res.status(404).json({ message: 'No se encontraron tareas' });
        }
        res.status(200).json(tareas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ==========================
// Obtener una tarea por ID
// route   GET /tareas/:id
// access  Public
// ==========================
exports.getTareaID = async (req, res) => {
    try {
        // Busca la tarea por su ID
        const tarea = await Tarea.findById(req.params.id);
        if (!tarea) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        res.status(200).json(tarea);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ==========================
// Crear una nueva tarea
// route   POST /tareas
// access  Public
// ==========================
exports.crearTarea = async (req, res) => {
    try {
        const { titulo, descripcion } = req.body;
        // Valida que el título sea obligatorio
        if (!titulo) {
            return res.status(400).json({ message: 'El título es requerido' });
        }
        // Crea una nueva instancia de tarea
        const nuevaTarea = new Tarea({ titulo, descripcion });
        // Guarda la tarea en la base de datos
        const tareaGuardada = await nuevaTarea.save();
        res.status(201).json(tareaGuardada);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ==========================
// Actualizar una tarea por ID
// route   PUT /tareas/:id
// access  Public
// ==========================
exports.actualizarTarea = async (req, res) => {
    try {
        // Busca y actualiza la tarea por su ID con los datos recibidos
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

// ==========================
// Eliminar una tarea por ID
// route   DELETE /tareas/:id
// access  Public
// ==========================
exports.eliminarTarea = async (req, res) => {
    try {
        // Busca y elimina la tarea por su ID
        const tarea = await Tarea.findByIdAndDelete(req.params.id);
        if (!tarea) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        res.status(204).send(); // 204 No Content para eliminación exitosa
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


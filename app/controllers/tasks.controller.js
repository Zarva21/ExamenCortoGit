const db = require('../config/db.config.js');
const Tarea = db.Tareas;

// Crear una nueva tarea
exports.create = async (req, res) => {
    try {
        const { id_proyecto, nombre, estado, fecha_vencimiento } = req.body;
        const tarea = await Tarea.create({ id_proyecto, nombre, estado, fecha_vencimiento });
        
        res.status(201).json({
            message: "Tarea creada exitosamente!",
            tarea: tarea,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creando la tarea!",
            error: error.message,
        });
    }
};

// Obtener todas las tareas
exports.retrieveAll = async (req, res) => {
    try {
        const tareas = await Tarea.findAll();
        res.status(200).json({
            message: "Tareas recuperadas exitosamente!",
            tareas: tareas,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error recuperando tareas!",
            error: error.message,
        });
    }
};

// Actualizar una tarea por ID
exports.updateById = async (req, res) => {
    try {
        const tareaId = req.params.id;
        const [updated] = await Tarea.update(req.body, {
            where: { id_tarea: tareaId },
        });

        if (!updated) {
            return res.status(404).send({ message: "Tarea no encontrada!" });
        }

        const updatedTarea = await Tarea.findByPk(tareaId);
        res.status(200).json({
            message: "Tarea actualizada exitosamente!",
            tarea: updatedTarea,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error actualizando la tarea!",
            error: error.message,
        });
    }
};

// Eliminar una tarea por ID
exports.deleteById = async (req, res) => {
    try {
        const tareaId = req.params.id;
        const tarea = await Tarea.findByPk(tareaId);

        if (!tarea) {
            return res.status(404).send({ message: "Tarea no encontrada!" });
        }

        await tarea.destroy();
        res.status(200).json({
            message: "Tarea eliminada exitosamente!",
        });
    } catch (error) {
        res.status(500).json({
            message: "Error eliminando la tarea!",
            error: error.message,
        });
    }
};

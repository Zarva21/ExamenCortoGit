const db = require('../config/db.config.js');
const Proyecto = db.Proyectos;

// Crear un nuevo proyecto
exports.create = async (req, res) => {
    try {
        const { id_usuario, nombre, descripcion } = req.body;
        const proyecto = await Proyecto.create({ id_usuario, nombre, descripcion });
        
        res.status(201).json({
            message: "Proyecto creado exitosamente!",
            proyecto: proyecto,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creando el proyecto!",
            error: error.message,
        });
    }
};

// Obtener todos los proyectos
exports.retrieveAll = async (req, res) => {
    try {
        const proyectos = await Proyecto.findAll();
        res.status(200).json({
            message: "Proyectos recuperados exitosamente!",
            proyectos: proyectos,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error recuperando proyectos!",
            error: error.message,
        });
    }
};

// Actualizar un proyecto por ID
exports.updateById = async (req, res) => {
    try {
        const proyectoId = req.params.id;
        const [updated] = await Proyecto.update(req.body, {
            where: { id_proyecto: proyectoId },
        });

        if (!updated) {
            return res.status(404).send({ message: "Proyecto no encontrado!" });
        }

        const updatedProyecto = await Proyecto.findByPk(proyectoId);
        res.status(200).json({
            message: "Proyecto actualizado exitosamente!",
            proyecto: updatedProyecto,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error actualizando el proyecto!",
            error: error.message,
        });
    }
};

// Eliminar un proyecto por ID
exports.deleteById = async (req, res) => {
    try {
        const proyectoId = req.params.id;
        const proyecto = await Proyecto.findByPk(proyectoId);

        if (!proyecto) {
            return res.status(404).send({ message: "Proyecto no encontrado!" });
        }

        await proyecto.destroy();
        res.status(200).json({
            message: "Proyecto eliminado exitosamente!",
        });
    } catch (error) {
        res.status(500).json({
            message: "Error eliminando el proyecto!",
            error: error.message,
        });
    }
};

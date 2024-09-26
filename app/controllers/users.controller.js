const db = require('../config/db.config.js');
const Usuario = db.Usuarios;  

// Crear un nuevo usuario
exports.create = async (req, res) => {
    try {
        const { nombre_usuario, correo_usuario, contraseña_usuario } = req.body;

        const nuevoUsuario = {
            nombre_usuario,
            correo_usuario,
            contraseña_usuario,
            fecha_creacion_usuario: new Date()
        };


        const usuarioCreado = await Usuario.create(nuevoUsuario);
        res.status(201).json({
            message: "Usuario creado exitosamente",
            usuario: usuarioCreado
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear usuario",
            error: error.message
        });
    }
};

// Actualizar un usuario por ID
exports.updateById = async (req, res) => {
    try {
        const id_usuario = req.params.id;
        const { nombre_usuario, correo_usuario, contraseña_usuario } = req.body;

        const usuario = await Usuario.findByPk(id_usuario);
        if (!usuario) {
            return res.status(404).json({
                message: `Usuario con id ${id_usuario} no encontrado`,
                error: "404"
            });
        }

        usuario.nombre_usuario = nombre_usuario;
        usuario.correo_usuario = correo_usuario;
        usuario.contraseña_usuario = contraseña_usuario;

        await usuario.save();
        res.status(200).json({
            message: `Usuario con id ${id_usuario} actualizado exitosamente`,
            usuario: usuario
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar el usuario",
            error: error.message
        });
    }
};

// Eliminar un usuario por ID
exports.deleteById = async (req, res) => {
    try {
        const id_usuario = req.params.id;
        const usuario = await Usuario.findByPk(id_usuario);

        if (!usuario) {
            return res.status(404).json({
                message: `Usuario con id ${id_usuario} no encontrado`,
                error: "404"
            });
        }

        await usuario.destroy();
        res.status(200).json({
            message: `Usuario con id ${id_usuario} eliminado exitosamente`
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el usuario",
            error: error.message
        });
    }
};

// Obtener todos los usuarios
exports.retrieveAllUsers = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.status(200).json({
            message: "Todos los usuarios recuperados exitosamente",
            usuarios: usuarios
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al recuperar usuarios",
            error: error.message
        });
    }
};

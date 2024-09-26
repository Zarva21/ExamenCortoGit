const db = require('../config/db.config.js');
const User = db.Usuarios;

exports.create = (req, res) => {
    let user = {};

    try {
        user.nombre_usuario = req.body.nombre_usuario; // Cambiado aquí
        user.correo_usuario = req.body.correo_usuario; // Cambiado aquí
        user.contraseña_usuario = req.body.contraseña_usuario; // Cambiado aquí

        User.create(user).then(result => {
            res.status(200).json({
                message: "User created successfully with id = " + result.id_usuario, // Cambiado aquí
                user: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error!",
            error: error.message
        });
    }
};
//
exports.updateById = async (req, res) => {
    try {
        let userId = req.params.id;
        let user = await User.findByPk(userId);

        if (!user) {
            res.status(404).json({
                message: "User not found with id = " + userId,
                user: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                nombre_usuario: req.body.nombre_usuario, // Cambiado aquí
                correo_usuario: req.body.correo_usuario, // Cambiado aquí
                contraseña_usuario: req.body.contraseña_usuario // Cambiado aquí
            };
            let result = await User.update(updatedObject, { returning: true, where: { id_usuario: userId } }); // Cambiado aquí

            if (!result) {
                res.status(500).json({
                    message: "Error updating user with id = " + userId,
                    error: "Failed to update",
                });
            }

            res.status(200).json({
                message: "User updated successfully with id = " + userId,
                user: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error updating user with id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteById = async (req, res) => {
    try {
        let userId = req.params.id;
        let user = await User.findByPk(userId);

        if (!user) {
            res.status(404).json({
                message: "User not found with id = " + userId,
                error: "404",
            });
        } else {
            await user.destroy();
            res.status(200).json({
                message: "User deleted successfully with id = " + userId,
                user: user,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error deleting user with id = " + req.params.id,
            error: error.message,
        });
    }
};

exports.retrieveAllUsers = (req, res) => {
    User.findAll()
        .then(userInfos => {
            res.status(200).json({
                message: "All users retrieved successfully!",
                users: userInfos
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
};

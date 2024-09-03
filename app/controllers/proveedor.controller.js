const db = require('../config/db.config.js');
const Proveedor = db.Proveedores;

exports.create = (req, res) => {
    let proveedor = {};

    try {
        proveedor.EMPRESA = req.body.EMPRESA;
        proveedor.DIRECCION = req.body.DIRECCION;
        proveedor.TELEFONO = req.body.TELEFONO;
        proveedor.NIT = req.body.NIT;
        proveedor.CIUDAD = req.body.CIUDAD;
        proveedor.PAIS = req.body.PAIS;
        proveedor.CONTACTO = req.body.CONTACTO;
        proveedor.EMAIL = req.body.EMAIL;
        proveedor.TELEFONO_CONTACTO = req.body.TELEFONO_CONTACTO;
        proveedor.ESTATUS = req.body.ESTATUS;

        Proveedor.create(proveedor).then(result => {    
            res.status(200).json({
                message: "Proveedor creado exitosamente con id = " + result.ID_PROVEEDOR,
                proveedor: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Error!",
            error: error.message
        });
    }
};

exports.updateById = async (req, res) => {
    try {
        let proveedorId = req.params.id;
        let proveedor = await Proveedor.findByPk(proveedorId);

        if (!proveedor) {
            res.status(404).json({
                message: "No se encontró el proveedor con id = " + proveedorId,
                proveedor: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                EMPRESA: req.body.EMPRESA,
                DIRECCION: req.body.DIRECCION,
                TELEFONO: req.body.TELEFONO,
                NIT: req.body.NIT,
                CIUDAD: req.body.CIUDAD,
                PAIS: req.body.PAIS,
                CONTACTO: req.body.CONTACTO,
                EMAIL: req.body.EMAIL,
                TELEFONO_CONTACTO: req.body.TELEFONO_CONTACTO,
                ESTATUS: req.body.ESTATUS
            };
            let result = await Proveedor.update(updatedObject, { returning: true, where: { ID_PROVEEDOR: proveedorId } });
            
            if (!result) {
                res.status(500).json({
                    message: "Error al actualizar el proveedor con id = " + proveedorId,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Proveedor actualizado exitosamente con id = " + proveedorId,
                proveedor: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar el proveedor con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteById = async (req, res) => {
    try {
        let proveedorId = req.params.id;
        let proveedor = await Proveedor.findByPk(proveedorId);

        if (!proveedor) {
            res.status(404).json({
                message: "No existe un proveedor con id = " + proveedorId,
                error: "404",
            });
        } else {
            await proveedor.destroy();
            res.status(200).json({
                message: "Proveedor eliminado exitosamente con id = " + proveedorId,
                proveedor: proveedor,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el proveedor con id = " + req.params.id,
            error: error.message,
        });
    }
};

exports.retrieveAllProveedores = (req, res) => {
    Proveedor.findAll({
        order: [
            ['EMPRESA', 'ASC']
        ]
    })
    .then(proveedorInfos => {
        res.status(200).json({
            message: "¡Todos los proveedores recuperados exitosamente!",
            proveedores: proveedorInfos
        });
    })
    .catch(error => {
        res.status(500).json({
            message: "¡Error!",
            error: error
        });
    });
};

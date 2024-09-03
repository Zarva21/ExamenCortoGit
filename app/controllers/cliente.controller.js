const db = require('../config/db.config.js');
const Cliente = db.Clientes;

// Crear un nuevo Cliente
exports.create = (req, res) => {
    let cliente = {};

    try {
        cliente.NOMBRE = req.body.NOMBRE;
        cliente.APELLIDO = req.body.APELLIDO;
        cliente.RAZON_SOCIAL = req.body.RAZON_SOCIAL;
        cliente.NIT = req.body.NIT;
        cliente.DIRECCION = req.body.DIRECCION;
        cliente.TELEFONO = req.body.TELEFONO;
        cliente.EMAIL = req.body.EMAIL;
        cliente.FECHA_INGRESO = req.body.FECHA_INGRESO;
        cliente.ESTATUS = req.body.ESTATUS;

        Cliente.create(cliente).then(result => {    
            res.status(200).json({
                message: "Cliente creado exitosamente con id = " + result.ID_CLIENTE,
                cliente: result,
            });
        });
    } catch(error) {
        res.status(500).json({
            message: "¡Error!",
            error: error.message
        });
    }
};

// Actualizar un Cliente por ID
exports.updateById = async (req, res) => {
    try {
        let clienteId = req.params.id;
        let cliente = await Cliente.findByPk(clienteId);

        if (!cliente) {
            res.status(404).json({
                message: "No se encontró el cliente con id = " + clienteId,
                cliente: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                NOMBRE: req.body.NOMBRE,
                APELLIDO: req.body.APELLIDO,
                RAZON_SOCIAL: req.body.RAZON_SOCIAL,
                NIT: req.body.NIT,
                DIRECCION: req.body.DIRECCION,
                TELEFONO: req.body.TELEFONO,
                EMAIL: req.body.EMAIL,
                FECHA_INGRESO: req.body.FECHA_INGRESO,
                ESTATUS: req.body.ESTATUS
            };
            let result = await Cliente.update(updatedObject, { returning: true, where: { ID_CLIENTE: clienteId } });
            
            if (!result) {
                res.status(500).json({
                    message: "Error al actualizar el cliente con id = " + clienteId,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Cliente actualizado exitosamente con id = " + clienteId,
                cliente: updatedObject,
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error al actualizar el cliente con id = " + req.params.id,
            error: error.message
        });
    }
};

// Eliminar un Cliente por ID
exports.deleteById = async (req, res) => {
    try {
        let clienteId = req.params.id;
        let cliente = await Cliente.findByPk(clienteId);

        if (!cliente) {
            res.status(404).json({
                message: "No existe un cliente con id = " + clienteId,
                error: "404",
            });
        } else {
            await cliente.destroy();
            res.status(200).json({
                message: "Cliente eliminado exitosamente con id = " + clienteId,
                cliente: cliente,
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error al eliminar el cliente con id = " + req.params.id,
            error: error.message,
        });
    }
};

// Consultar todos los Clientes
exports.retrieveAllClientes = (req, res) => {
    Cliente.findAll({
        order: [
            ['APELLIDO', 'ASC']
        ]
    })
    .then(clienteInfos => {
        res.status(200).json({
            message: "¡Todos los clientes recuperados exitosamente!",
            clientes: clienteInfos
        });
    })
    .catch(error => {
        res.status(500).json({
            message: "¡Error!",
            error: error
        });
    });
};

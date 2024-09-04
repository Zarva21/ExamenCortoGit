const db = require('../config/db.config.js');
const FacturaDetalle = db.FacturaDetalles;

exports.create = (req, res) => {
    let facturaDetalle = {};

    try {
        facturaDetalle.ID_FACTURA = req.body.ID_FACTURA;
        facturaDetalle.ID_LINEA = req.body.ID_LINEA;
        facturaDetalle.ID_PRODUCTO = req.body.ID_PRODUCTO;
        facturaDetalle.CANTIDAD = req.body.CANTIDAD;

        FacturaDetalle.create(facturaDetalle).then(result => {
            res.status(200).json({
                message: "Detalle de factura creado exitosamente con id = " + result.ID_FACTURA + ", línea = " + result.ID_LINEA,
                facturaDetalle: result,
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
        let facturaDetalleId = {
            ID_FACTURA: req.params.idFactura,
            ID_LINEA: req.params.idLinea
        };
        let facturaDetalle = await FacturaDetalle.findOne({ where: facturaDetalleId });

        if (!facturaDetalle) {
            res.status(404).json({
                message: "No se encontró el detalle de la factura con id = " + req.params.idFactura + " y línea = " + req.params.idLinea,
                facturaDetalle: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                ID_PRODUCTO: req.body.ID_PRODUCTO,
                CANTIDAD: req.body.CANTIDAD
            };
            let result = await FacturaDetalle.update(updatedObject, { returning: true, where: facturaDetalleId });

            if (!result) {
                res.status(500).json({
                    message: "Error al actualizar el detalle de la factura con id = " + req.params.idFactura + " y línea = " + req.params.idLinea,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Detalle de factura actualizado exitosamente con id = " + req.params.idFactura + " y línea = " + req.params.idLinea,
                facturaDetalle: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar el detalle de la factura con id = " + req.params.idFactura + " y línea = " + req.params.idLinea,
            error: error.message
        });
    }
};

exports.deleteById = async (req, res) => {
    try {
        let facturaDetalleId = {
            ID_FACTURA: req.params.idFactura,
            ID_LINEA: req.params.idLinea
        };
        let facturaDetalle = await FacturaDetalle.findOne({ where: facturaDetalleId });

        if (!facturaDetalle) {
            res.status(404).json({
                message: "No existe un detalle de factura con id = " + req.params.idFactura + " y línea = " + req.params.idLinea,
                error: "404",
            });
        } else {
            await facturaDetalle.destroy();
            res.status(200).json({
                message: "Detalle de factura eliminado exitosamente con id = " + req.params.idFactura + " y línea = " + req.params.idLinea,
                facturaDetalle: facturaDetalle,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el detalle de la factura con id = " + req.params.idFactura + " y línea = " + req.params.idLinea,
            error: error.message,
        });
    }
};

exports.retrieveAllFacturaDetalles = (req, res) => {
    FacturaDetalle.findAll({
        order: [
            ['ID_FACTURA', 'ASC'],
            ['ID_LINEA', 'ASC']
        ]
    })
        .then(facturaDetalles => {
            res.status(200).json({
                message: "¡Todos los detalles de factura recuperados exitosamente!",
                facturaDetalles: facturaDetalles
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error!",
                error: error
            });
        });
};

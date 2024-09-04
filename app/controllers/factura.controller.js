const db = require('../config/db.config.js');
const Factura = db.Facturas;

exports.create = (req, res) => {
    let factura = {};

    try {
        factura.NO_FACT = req.body.NO_FACT;
        factura.SERIE = req.body.SERIE;
        factura.ID_CLIENTE = req.body.ID_CLIENTE;
        factura.ID_EMPLEADO = req.body.ID_EMPLEADO;
        factura.FECHA_FAC = req.body.FECHA_FAC;

        Factura.create(factura).then(result => {
            res.status(200).json({
                message: "Factura creada exitosamente con id = " + result.ID_FACTURA,
                factura: result,
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
        let facturaId = req.params.id;
        let factura = await Factura.findByPk(facturaId);

        if (!factura) {
            res.status(404).json({
                message: "No se encontró la factura con id = " + facturaId,
                factura: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                NO_FACT: req.body.NO_FACT,
                SERIE: req.body.SERIE,
                ID_CLIENTE: req.body.ID_CLIENTE,
                ID_EMPLEADO: req.body.ID_EMPLEADO,
                FECHA_FAC: req.body.FECHA_FAC
            };
            let result = await Factura.update(updatedObject, { returning: true, where: { ID_FACTURA: facturaId } });

            if (!result) {
                res.status(500).json({
                    message: "Error al actualizar la factura con id = " + facturaId,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Factura actualizada exitosamente con id = " + facturaId,
                factura: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar la factura con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteById = async (req, res) => {
    try {
        let facturaId = req.params.id;
        let factura = await Factura.findByPk(facturaId);

        if (!factura) {
            res.status(404).json({
                message: "No existe una factura con id = " + facturaId,
                error: "404",
            });
        } else {
            await factura.destroy();
            res.status(200).json({
                message: "Factura eliminada exitosamente con id = " + facturaId,
                factura: factura,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar la factura con id = " + req.params.id,
            error: error.message,
        });
    }
};

exports.retrieveAllFacturas = (req, res) => {
    Factura.findAll({
        order: [
            ['FECHA_FAC', 'DESC']
        ]
    })
        .then(facturaInfos => {
            res.status(200).json({
                message: "¡Todas las facturas recuperadas exitosamente!",
                facturas: facturaInfos
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

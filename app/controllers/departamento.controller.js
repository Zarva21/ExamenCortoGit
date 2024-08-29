const db = require('../config/db.config.js');
const Departamento = db.Departamentos;

exports.create = (req, res) => {
    let departamento = {};

    try {
        departamento.DESCRIPCION = req.body.DESCRIPCION;
        
        Departamento.create(departamento).then(result => {    
            res.status(200).json({
                message: "Departamento creado exitosamente con id = " + result.ID_DEPARTAMENTO,
                departamento: result,
            });
        });
    } catch(error) {
        res.status(500).json({
            message: "¡Error!",
            error: error.message
        });
    }
}

exports.updateById = async (req, res) => {
    try {
        let departamentoId = req.params.id;
        let departamento = await Departamento.findByPk(departamentoId);

        if (!departamento) {
            res.status(404).json({
                message: "No se encontró el departamento con id = " + departamentoId,
                departamento: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                DESCRIPCION: req.body.DESCRIPCION
            };
            let result = await Departamento.update(updatedObject, { returning: true, where: { ID_DEPARTAMENTO: departamentoId } });
            
            if (!result) {
                res.status(500).json({
                    message: "Error al actualizar el departamento con id = " + departamentoId,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Departamento actualizado exitosamente con id = " + departamentoId,
                departamento: updatedObject,
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error al actualizar el departamento con id = " + req.params.id,
            error: error.message
        });     
    }
}

exports.deleteById = async (req, res) => {
    try {
        let departamentoId = req.params.id;
        let departamento = await Departamento.findByPk(departamentoId);

        if (!departamento) {
            res.status(404).json({
                message: "No existe un departamento con id = " + departamentoId,
                error: "404",
            });
        } else {
            await departamento.destroy();
            res.status(200).json({
                message: "Departamento eliminado exitosamente con id = " + departamentoId,
                departamento: departamento,
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error al eliminar el departamento con id = " + req.params.id,
            error: error.message,
        });
    }
}

exports.retrieveAllDepartamentos = (req, res) => {
    
    Departamento.findAll({
        order: [
            ['DESCRIPCION', 'ASC']
        ]
    })
    .then(departamentoInfos => {
        res.status(200).json({
            message: "¡Todos los departamentos recuperados exitosamente!",
            departamentos: departamentoInfos
        });
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: "¡Error!",
            error: error
        });
    });
}

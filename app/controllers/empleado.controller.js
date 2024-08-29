const db = require('../config/db.config.js');
const Empleado = db.Empleados;

exports.create = (req, res) => {
    let empleado = {};

    try {
        empleado.PRIMER_NOMBRE = req.body.PRIMER_NOMBRE;
        empleado.SEGUNDO_NOMBRE = req.body.SEGUNDO_NOMBRE;
        empleado.PRIMER_APELLIDO = req.body.PRIMER_APELLIDO;
        empleado.SEGUNDO_APELLIDO = req.body.SEGUNDO_APELLIDO;
        empleado.NIT = req.body.NIT;
        empleado.SALARIO = req.body.SALARIO;
        empleado.ESTATUS = req.body.ESTATUS;
        empleado.ID_DEPARTAMENTO = req.body.ID_DEPARTAMENTO;
        
        Empleado.create(empleado).then(result => {    
            res.status(200).json({
                message: "Empleado creado exitosamente con id = " + result.ID_EMPLEADO,
                empleado: result,
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
        let empleadoId = req.params.id;
        let empleado = await Empleado.findByPk(empleadoId);

        if (!empleado) {
            res.status(404).json({
                message: "No se encontró el empleado con id = " + empleadoId,
                empleado: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                PRIMER_NOMBRE: req.body.PRIMER_NOMBRE,
                SEGUNDO_NOMBRE: req.body.SEGUNDO_NOMBRE,
                PRIMER_APELLIDO: req.body.PRIMER_APELLIDO,
                SEGUNDO_APELLIDO: req.body.SEGUNDO_APELLIDO,
                NIT: req.body.NIT,
                SALARIO: req.body.SALARIO,
                ESTATUS: req.body.ESTATUS,
                ID_DEPARTAMENTO: req.body.ID_DEPARTAMENTO
            };
            let result = await Empleado.update(updatedObject, { returning: true, where: { ID_EMPLEADO: empleadoId } });
            
            if (!result) {
                res.status(500).json({
                    message: "Error al actualizar el empleado con id = " + empleadoId,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Empleado actualizado exitosamente con id = " + empleadoId,
                empleado: updatedObject,
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error al actualizar el empleado con id = " + req.params.id,
            error: error.message
        });
    }
}


exports.deleteById = async (req, res) => {
    try {
        let empleadoId = req.params.id;
        let empleado = await Empleado.findByPk(empleadoId);

        if (!empleado) {
            res.status(404).json({
                message: "No existe un empleado con id = " + empleadoId,
                error: "404",
            });
        } else {
            await empleado.destroy();
            res.status(200).json({
                message: "Empleado eliminado exitosamente con id = " + empleadoId,
                empleado: empleado,
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error al eliminar el empleado con id = " + req.params.id,
            error: error.message,
        });
    }
}


exports.retrieveAllEmpleados = (req, res) => {
    
    Empleado.findAll({
        order: [
            ['PRIMER_APELLIDO', 'ASC']
        ]
    })
    .then(empleadoInfos => {
        res.status(200).json({
            message: "¡Todos los empleados recuperados exitosamente!",
            empleados: empleadoInfos
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

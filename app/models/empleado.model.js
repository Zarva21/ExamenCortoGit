module.exports = (sequelize, Sequelize) => {
    const Empleado = sequelize.define('empleado', {
        ID_EMPLEADO: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        PRIMER_NOMBRE: {
            type: Sequelize.STRING(100)
        },
        SEGUNDO_NOMBRE: {
            type: Sequelize.STRING(100)
        },
        PRIMER_APELLIDO: {
            type: Sequelize.STRING(100)
        },
        SEGUNDO_APELLIDO: {
            type: Sequelize.STRING(100)
        },
        NIT: {
            type: Sequelize.STRING(10)
        },
        SALARIO: {
            type: Sequelize.INTEGER
        },
        ESTATUS: {
            type: Sequelize.INTEGER
        },
        ID_DEPARTAMENTO: {
            type: Sequelize.INTEGER,
            
        }
    });

    return Empleado;
}

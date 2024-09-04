module.exports = (sequelize, Sequelize) => {
    const Factura = sequelize.define('factura', {
        ID_FACTURA: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        NO_FACT: {
            type: Sequelize.INTEGER
        },
        SERIE: {
            type: Sequelize.STRING(20)
        },
        ID_CLIENTE: {
            type: Sequelize.INTEGER
        },
        ID_EMPLEADO: {
            type: Sequelize.INTEGER
        },
        FECHA_FAC: {
            type: Sequelize.DATE
        }
    });

    return Factura;
};

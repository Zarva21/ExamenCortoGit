module.exports = (sequelize, Sequelize) => {
    const Proveedor = sequelize.define('proveedor', {
        ID_PROVEEDOR: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        EMPRESA: {
            type: Sequelize.STRING(100)
        },
        DIRECCION: {
            type: Sequelize.STRING(100)
        },
        TELEFONO: {
            type: Sequelize.INTEGER
        },
        NIT: {
            type: Sequelize.STRING(30)
        },
        CIUDAD: {
            type: Sequelize.STRING(100)
        },
        PAIS: {
            type: Sequelize.STRING(100)
        },
        CONTACTO: {
            type: Sequelize.STRING(100)
        },
        EMAIL: {
            type: Sequelize.STRING(100)
        },
        TELEFONO_CONTACTO: {
            type: Sequelize.INTEGER
        },
        ESTATUS: {
            type: Sequelize.INTEGER
        }
    });

    return Proveedor;
}

module.exports = (sequelize, Sequelize) => {
    const Cliente = sequelize.define('cliente', {
        ID_CLIENTE: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        NOMBRE: {
            type: Sequelize.STRING(100)
        },
        APELLIDO: {
            type: Sequelize.STRING(100)
        },
        RAZON_SOCIAL: {
            type: Sequelize.STRING(100)
        },
        NIT: {
            type: Sequelize.STRING(10)
        },
        DIRECCION: {
            type: Sequelize.STRING(100)
        },
        TELEFONO: {
            type: Sequelize.STRING(100)
        },
        EMAIL: {
            type: Sequelize.STRING(50)
        },
        FECHA_INGRESO: {
            type: Sequelize.DATE
        },
        ESTATUS: {
            type: Sequelize.INTEGER
        }
    });

    return Cliente;
};

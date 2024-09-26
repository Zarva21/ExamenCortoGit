module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define('usuario', {
        id_usuario: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true, 
            allowNull: false
        },
        nombre_usuario: {
            type: Sequelize.STRING(100)
        },
        correo_usuario: {
            type: Sequelize.STRING(100)
        },
        contraseña_usuario: {
            type: Sequelize.STRING(100)
        },
        fecha_creacion_usuario: {
            type: Sequelize.DATE
        }
    });

    return Usuario;
};

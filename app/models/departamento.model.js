module.exports = (sequelize, Sequelize) => {
    const Departamento = sequelize.define('Departamento', {
        ID_DEPARTAMENTO: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        DESCRIPCION: {
            type: Sequelize.STRING(80) 
        },
        copyrightby: {
            type: Sequelize.STRING,
            defaultValue: 'UMG Antigua'
        }
    });

    return Departamento;
}

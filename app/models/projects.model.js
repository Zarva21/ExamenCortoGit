module.exports = (sequelize, Sequelize) => {
    const Proyecto = sequelize.define('proyecto', {
      id_proyecto: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true 
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuarios',
          key: 'id_usuario'
        }
      },
      nombre: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      descripcion: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      fecha_creacion: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW 
      }
    });
  
    return Proyecto;
  };
  
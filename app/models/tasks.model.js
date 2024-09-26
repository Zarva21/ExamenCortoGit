module.exports = (sequelize, Sequelize) => {
    const Tarea = sequelize.define('tarea', {
      id_tarea: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true // Auto incrementable si lo necesitas
      },
      id_proyecto: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'proyectos', // Nombre del modelo de proyectos
          key: 'id_proyecto'
        }
      },
      nombre: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      estado: {
        type: Sequelize.STRING(100),
        allowNull: false,
        defaultValue: 'pendiente' // Estado inicial por defecto
      },
      fecha_creacion: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      fecha_vencimiento: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });
  
    return Tarea;
  };
  
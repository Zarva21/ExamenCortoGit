module.exports = (sequelize, Sequelize) => {
    const Producto = sequelize.define('producto', {
        ID_PRODUCTO: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        DESCRIPCION: {
            type: Sequelize.STRING(100)
        },
        STOCK: {
            type: Sequelize.INTEGER
        },
        STOCK_MINIMO: {
            type: Sequelize.INTEGER
        },
        PRECIO_UNITARIO: {
            type: Sequelize.FLOAT
        },
        ID_PROVEEDOR: {
            type: Sequelize.INTEGER
        }
    });

    return Producto;
};

module.exports = (sequelize, Sequelize) => {
    const FacturaDetalle = sequelize.define('factura_detalle', {
        ID_FACTURA: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
                model: 'facturas',
                key: 'ID_FACTURA'
            }
        },
        ID_LINEA: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        ID_PRODUCTO: {
            type: Sequelize.INTEGER,
            references: {
                model: 'productos',
                key: 'ID_PRODUCTO'
            }
        },
        CANTIDAD: {
            type: Sequelize.INTEGER
        }
    }, {
        timestamps: false
    });

    return FacturaDetalle;
};

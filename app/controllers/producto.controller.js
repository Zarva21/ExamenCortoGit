const db = require('../config/db.config.js');
const Producto = db.Productos;

exports.create = (req, res) => {
    let producto = {};

    try {
        producto.DESCRIPCION = req.body.DESCRIPCION;
        producto.STOCK = req.body.STOCK;
        producto.STOCK_MINIMO = req.body.STOCK_MINIMO;
        producto.PRECIO_UNITARIO = req.body.PRECIO_UNITARIO;
        producto.ID_PROVEEDOR = req.body.ID_PROVEEDOR;
        
        Producto.create(producto).then(result => {    
            res.status(200).json({
                message: "Producto creado exitosamente con id = " + result.ID_PRODUCTO,
                producto: result,
            });
        });
    } catch(error) {
        res.status(500).json({
            message: "¡Error!",
            error: error.message
        });
    }
};

exports.updateById = async (req, res) => {
    try {
        let productoId = req.params.id;
        let producto = await Producto.findByPk(productoId);

        if (!producto) {
            res.status(404).json({
                message: "No se encontró el producto con id = " + productoId,
                producto: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                DESCRIPCION: req.body.DESCRIPCION,
                STOCK: req.body.STOCK,
                STOCK_MINIMO: req.body.STOCK_MINIMO,
                PRECIO_UNITARIO: req.body.PRECIO_UNITARIO,
                ID_PROVEEDOR: req.body.ID_PROVEEDOR
            };
            let result = await Producto.update(updatedObject, { returning: true, where: { ID_PRODUCTO: productoId } });
            
            if (!result) {
                res.status(500).json({
                    message: "Error al actualizar el producto con id = " + productoId,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Producto actualizado exitosamente con id = " + productoId,
                producto: updatedObject,
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error al actualizar el producto con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteById = async (req, res) => {
    try {
        let productoId = req.params.id;
        let producto = await Producto.findByPk(productoId);

        if (!producto) {
            res.status(404).json({
                message: "No existe un producto con id = " + productoId,
                error: "404",
            });
        } else {
            await producto.destroy();
            res.status(200).json({
                message: "Producto eliminado exitosamente con id = " + productoId,
                producto: producto,
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error al eliminar el producto con id = " + req.params.id,
            error: error.message,
        });
    }
};

exports.retrieveAllProductos = (req, res) => {
    Producto.findAll({
        order: [
            ['DESCRIPCION', 'ASC']
        ]
    })
    .then(productoInfos => {
        res.status(200).json({
            message: "¡Todos los productos recuperados exitosamente!",
            productos: productoInfos
        });
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: "¡Error!",
            error: error
        });
    });
};

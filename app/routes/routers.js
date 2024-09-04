const express = require('express');
const router = express.Router();


const departamento = require('../controllers/departamento.controller.js');
const empleado = require('../controllers/empleado.controller.js');
const cliente = require('../controllers/cliente.controller.js');
const proveedor = require('../controllers/proveedor.controller.js');
const producto = require('../controllers/producto.controller.js');
const factura = require('../controllers/factura.controller.js');

// Departamento routes
router.post('/api/departamentos/create', departamento.create);
router.put('/api/departamentos/update/:id', departamento.updateById);
router.delete('/api/departamentos/delete/:id', departamento.deleteById);
router.get('/api/departamentos/all', departamento.retrieveAllDepartamentos);

// Empleado routes
router.post('/api/empleados/create', empleado.create);
router.put('/api/empleados/update/:id', empleado.updateById);
router.delete('/api/empleados/delete/:id', empleado.deleteById);
router.get('/api/empleados/all', empleado.retrieveAllEmpleados);

// Rutas para Cliente
router.post('/api/clientes/create', cliente.create);
router.put('/api/clientes/update/:id', cliente.updateById);
router.delete('/api/clientes/delete/:id', cliente.deleteById);
router.get('/api/clientes/all', cliente.retrieveAllClientes);

// Proveedor routes
router.post('/api/proveedores/create', proveedor.create);
router.put('/api/proveedores/update/:id', proveedor.updateById);
router.delete('/api/proveedores/delete/:id', proveedor.deleteById);
router.get('/api/proveedores/all', proveedor.retrieveAllProveedores);

// Producto routes
router.post('/api/productos/create', producto.create);
router.put('/api/productos/update/:id', producto.updateById);
router.delete('/api/productos/delete/:id', producto.deleteById);
router.get('/api/productos/all', producto.retrieveAllProductos);


// Factura routes
router.post('/api/facturas/create', factura.create);
router.put('/api/facturas/update/:id', factura.updateById);
router.delete('/api/facturas/delete/:id', factura.deleteById);
router.get('/api/facturas/all', factura.retrieveAllFacturas);


module.exports = router;

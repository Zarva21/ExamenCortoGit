const express = require('express');
const router = express.Router();


const departamento = require('../controllers/departamento.controller.js');
const empleado = require('../controllers/empleado.controller.js');
const cliente = require('../controllers/cliente.controller.js');


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




module.exports = router;

const express = require('express');
const router = express.Router();

const User = require('../controllers/users.controller.js');
const Proyecto = require('../controllers/projects.controller.js');
const Tarea = require('../controllers/tasks.controller.js');



// usuario routes
router.post('/api/usuarios/create', User.create);
router.put('/api/usuarios/update/:id', User.updateById);
router.delete('/api/usuarios/delete/:id', User.deleteById);
router.get('/api/usuarios/all', User.retrieveAllUsers);

// Rutas de proyectos
router.post('/api/proyectos/create', Proyecto.create);
router.put('/api/proyectos/update/:id', Proyecto.updateById);
router.delete('/api/proyectos/delete/:id', Proyecto.deleteById);
router.get('/api/proyectos/all', Proyecto.retrieveAll);

// Rutas de tareas
router.post('/api/tareas/create', Tarea.create);
router.put('/api/tareas/update/:id', Tarea.updateById);
router.delete('/api/tareas/delete/:id', Tarea.deleteById);
router.get('/api/tareas/all', Tarea.retrieveAll);



module.exports = router;
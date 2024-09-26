const express = require('express');
const router = express.Router();

const usuario = require('../controllers/users.controller.js');

// usuario routes
router.post('/api/usuarios/create', usuario.create);
router.put('/api/usuarios/update/:id', usuario.updateById);
router.delete('/api/usuarios/delete/:id', usuario.deleteById);
router.get('/api/usuarios/all', usuario.retrieveAllUsers);


module.exports = router;
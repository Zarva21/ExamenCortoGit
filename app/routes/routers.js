const express = require('express');
const router = express.Router();

const usuario = require('../controllers/users.controller.js');

// usuario routes
router.post('/api/usuarios/create', User.create);
router.put('/api/usuarios/update/:id', User.updateById);
router.delete('/api/usuarios/delete/:id', User.deleteById);
router.get('/api/usuarios/all', User.retrieveAllUsers);

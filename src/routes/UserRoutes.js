'use strict';

const express = require('express');
const router = express.Router();
const authService = require('../services/auth-service');

const UserController = require('../controllers/UserController');

router.get('/', UserController.index);
router.post('/', UserController.store);
router.put('/:id', UserController.update);
router.delete('/:id', authService.authorize, UserController.delete);

module.exports = router;


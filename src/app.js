'use strict';
const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/api', {useNewUrlParser: true});

// Carrega todos os models
requireDir('./models');

// Carrega as rotas
app.use('/user', require('./routes/UserRoutes'));

module.exports = app;
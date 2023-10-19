'use strict';

const mongoose = require('mongoose');

const tareaSchema = new mongoose.Schema({
    nombre: String,
    descripcion: String,
    fecha: Date,
    prioridad: Number
});

module.exports = mongoose.model('Tarea', tareaSchema);
'use strict';

const express = require('express');
const tareaController = require('../controllers/tarea');

const tareaRouter = express.Router();

tareaRouter.route('/')
    .post(tareaController.createTarea)
    .get(tareaController.getTareas);

tareaRouter.route('/:id')
    .get(tareaController.getTarea)
    .put(tareaController.updateTarea)
    .delete(tareaController.deleteTarea);

module.exports = tareaRouter;

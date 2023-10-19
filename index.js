'use strict';

const mongoose = require('mongoose');
const port = 3800;
const app = require('./app');

mongoose.connect('mongodb://127.0.0.1:27017/DbTareas', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conexión correcta a la base de datos.');
        app.listen(port, () => {
            console.log('Servidor de Express corriendo en el puerto:', port);
        });
    })
    .catch(err => {
        console.error('Error de conexión:', err);
    });

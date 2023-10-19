'use strict';

const Tarea = require('../models/tarea');
const moment = require('moment');

const createTarea = async (req, res) => {
    const { nombre, descripcion, fecha, prioridad } = req.body;

    if (nombre && descripcion && fecha && prioridad) {
        try {
            const tarea = await Tarea.create({ nombre, descripcion, fecha, prioridad });
            res.send({ success: true, message: "Se guardó correctamente", data: tarea });
        } catch (error) {
            res.status(500).send({ success: false, error });
        }
    } else {
        res.status(400).send({ success: false, error: "Parámetros inválidos" });
    }
};

const getTarea = async (req, res) => {
    const { id } = req.params;

    if (id) {
        try {
            const tarea = await Tarea.findById(id);
            res.send({
                success: true,
                message: "Tarea encontrada",
                data: {
                    ...tarea.toObject(),
                    fecha: moment(tarea.fecha).format('DD-MM-YYYY'),
                }
            });
        } catch (error) {
            res.status(500).send({ success: false, error: error.message });
        }
    } else {
        res.status(400).send({ success: false, error: "Datos incorrectos" });
    }
};

const getTareas = async (req, res) => {
    try {
        const tareas = await Tarea.find();

        res.send({
            success: true,
            message: "Tareas encontradas",
            data: tareas.map(tarea => ({
                id: tarea._id,
                ...tarea.toObject(),
                fecha: moment(tarea.fecha).format('YYYY-MM-DD'),
            }))
        });
    } catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
};

const updateTarea = async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    if (Object.keys(body).length > 0) {
        try {
            const updatedTarea = await Tarea.findByIdAndUpdate(id, body, { new: true });
            res.send({ success: true, message: "Se guardó correctamente", data: updatedTarea });
        } catch (error) {
            res.status(500).send({ success: false, error: error.message });
        }
    } else {
        res.status(400).send({ success: false, error: "Parámetros inválidos" });
    }
};

const deleteTarea = async (req, res) => {
    const { id } = req.params;

    if (id) {
        try {
            const tarea = await Tarea.findByIdAndDelete(id);
            res.send({ success: true, message: "Tarea eliminada", data: tarea });
        } catch (error) {
            res.status(500).send({ success: false, error: error.message });
        }
    } else {
        res.status(400).send({ success: false, error: "Datos incorrectos" });
    }
};

module.exports = {
    createTarea,
    getTarea,
    getTareas,
    updateTarea,
    deleteTarea
};

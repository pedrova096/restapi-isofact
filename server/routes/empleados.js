const Empleado = require('../models/empleado');
const express = require('express');
const app = express();
//Listar todas las empleados
app.get('/empleados', [], function(req, res) {
    let condicion = { activo: true }
    let limit = Number(req.query.limit || 5);
    let page = Number((req.query.page || 0) * limit);

    Empleado.find(condicion)
        .populate('empresa', 'nombre estado')
        .limit(limit)
        .skip(page)
        .exec((error, empleados) => {
            if (error) {
                return res.status(500).json({
                    err: true,
                    error
                });
            }
            res.json({
                err: false,
                empleados
            })
        });
});
//Crear empleado
app.post('/empleados', [], function(req, res) {
    let body = req.body;
    let empleados = new Empleado({
        nombre: body.nombre,
        apellido: body.apellido,
        empresa: body.empresa,
        fechaSys: new Date().getTime()
    });
    empleados.save((error, empleadoRES) => {
        if (error) {
            return res.status(500).json({
                err: true,
                error
            });
        }
        res.status(201).json({
            err: false,
            empleado: empleadoRES
        })
    })
});
//Detalle empleado
app.get('/empleados/:id', [], function(req, res) {
    let id = req.params.id;
    Empleado.findById(id, (error, empleadoRES) => {
        if (error) {
            return res.status(500).json({
                err: true,
                error
            });
        } else if (!empleadoRES) {
            return res.status(400).json({
                err: true,
                error: {
                    mensaje: `No existe registro de la empleado con el id:${id}.`
                }
            });
        }
        res.json({
            err: false,
            empleado: empleadoRES
        });
    })
});
//Actualizar empleado
app.post('/empleados/:id', [], function(req, res) {
    let id = req.params.id;
    let body = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        empresa: req.body.empresa,
        activo: req.body.activo || true
    };
    Empleado.findByIdAndUpdate(id, body, { new: true, runValidators: true },
        (error, empleadoRES) => {
            if (error) {
                return res.status(500).json({
                    err: true,
                    error
                });
            } else if (!empleadoRES) {
                return res.status(400).json({
                    err: true,
                    error: {
                        mensaje: `No existe registro de la empleado con el id:${id}.`
                    }
                });
            }
            res.json({
                err: false,
                empleado: empleadoRES
            });
        });
});
//Borrar empleado
app.delete('/empleados/:id', [], function(req, res) {
    let id = req.params.id;
    let body = { activo: false };
    Empleado.findByIdAndUpdate(id, body, { new: true, runValidators: true },
        (error, empleadoRES) => {
            if (error) {
                return res.status(500).json({
                    err: true,
                    error
                });
            } else if (!empleadoRES) {
                return res.status(400).json({
                    err: true,
                    error: {
                        mensaje: `No existe registro de la empleado con el id:${id}.`
                    }
                });
            }
            res.json({
                err: false,
                empleado: empleadoRES
            });
        });
});

module.exports = app;
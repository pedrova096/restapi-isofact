const Empresa = require('../models/empresa');
const Empleado = require('../models/empleado');
const express = require('express');
const app = express();
//Listar todas las empresas
app.get('/empresas', [], function(req, res) {
    let condicion = { activo: true }
    let limit = Number(req.query.limit || 5);
    let page = Number((req.query.page || 0) * limit);
    //=5&=2
    Empresa.find(condicion)
        .limit(limit)
        .skip(page)
        .exec((error, empresas) => {
            if (error) {
                return res.status(500).json({
                    err: true,
                    error
                });
            }
            res.json({
                err: false,
                empresas
            });
        });
});
//Crear empresa
app.post('/empresas', function(req, res) {
    let body = req.body;
    let empresa = new Empresa({
        nombre: body.nombre,
        descripcion: body.descripcion,
        fechaSys: new Date().getTime()
    });
    empresa.save((error, empresaRES) => {
        if (error) {
            return res.status(400).json({
                err: true,
                error
            });
        }
        res.status(201).json({
            err: false,
            empresa: empresaRES
        })
    })
});
//Detalle empresa
app.get('/empresas/:id', [], function(req, res) {
    let id = req.params.id;
    let condicion = {
        _id: id,
        activo: true
    }
    Empresa.findOne(condicion, (error, empresaRES) => {
        if (error) {
            return res.status(500).json({
                err: true,
                error
            });
        } else if (!empresaRES) {
            return res.status(400).json({
                err: true,
                error: {
                    mensaje: `No existe registro de la empresa con el id:${id}.`
                }
            });
        }
        res.json({
            err: false,
            empresa: empresaRES
        });
    })
});
//Actualizar empresa
app.post('/empresas/:id', [], function(req, res) {
    let id = req.params.id;
    let body = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        activo: req.body.activo || true
    };
    Empresa.findByIdAndUpdate(id, body, { new: true, runValidators: true },
        (error, empresaRES) => {
            if (error) {
                return res.status(500).json({
                    err: true,
                    error
                });
            } else if (!empresaRES) {
                return res.status(400).json({
                    err: true,
                    error: {
                        mensaje: `No existe registro de la empresa con el id:${id}.`
                    }
                });
            }
            res.json({
                err: false,
                empresa: empresaRES
            });
        });
});
//Borrar empresa
app.delete('/empresas/:id', [], function(req, res) {
    let id = req.params.id;
    let body = { activo: false };
    Empresa.findByIdAndUpdate(id, body, { new: true, runValidators: true },
        (error, empresaRES) => {
            if (error) {
                return res.status(500).json({
                    err: true,
                    error
                });
            } else if (!empresaRES) {
                return res.status(400).json({
                    err: true,
                    error: {
                        mensaje: `No existe registro de la empresa con el id:${id}.`
                    }
                });
            }
            res.json({
                err: false,
                empresa: empresaRES
            });
        });
});
//Listar empleados dado el id
app.get('/empresas/:id/empleados', [], function(req, res) {
    let id = req.params.id;
    let condicion = {
        empresa: id,
        activo: true
    }
    Empleado.find(condicion)
        .populate('empresa', 'nombre', { activo: true })
        .exec((error, empleados) => {
            if (error) {
                return res.status(500).json({
                    err: true,
                    error
                });
            } else if (!empleados) {
                return res.status(400).json({
                    err: true,
                    error: {
                        mensaje: `No existe registro de la empresa con el id:${id}.`
                    }
                });
            }
            res.json({
                err: false,
                empleados
            });
        });
});

module.exports = app;
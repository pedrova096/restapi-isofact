const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//Configuracion de las rutas
app.use(require('./routes/index.js'));
app.use(express.static(path.resolve(__dirname, '../public')));


//Configuracion de conecciones
process.env.PORT = process.env.PORT || 3000;
process.env.URLDB = process.env.URLDB || 'mongodb://localhost:27017/cafe';

mongoose.connect(process.env.URLDB, (err, res) => {
    if (err) throw err;
    console.log('Conectado a DB mongo');
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});
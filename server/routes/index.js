const express = require('express');
const app = express();

app.use(require('./empresas'));
app.use(require('./empleados'));

module.exports = app;
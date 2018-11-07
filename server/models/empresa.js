const mongoose = require('mongoose')
const Schema = mongoose.Schema;
let empresaSchema = new Schema({
    nombre: { type: String, unique: true, required: [true, 'El nombre es obligatorio'] },
    descripcion: { type: String, required: false },
    activo: { type: Boolean, required: false, default: true },
    fechaSys: { type: Date, required: true }
});
module.exports = mongoose.model('Empresas', empresaSchema);
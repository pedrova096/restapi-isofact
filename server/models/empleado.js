const mongoose = require('mongoose')
const Schema = mongoose.Schema;
let empleadoSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es obligatorio'] },
    apellido: { type: String, required: [true, 'El apellido es obligatorio'] },
    activo: { type: Boolean, required: false, default: true },
    empresa: { type: Schema.Types.ObjectId, ref: 'Empresas', required: true },
    fechaSys: { type: Date, required: true }
});
empleadoSchema.index({ "nombre": 1, "apellido": 1 }, { unique: true });
module.exports = mongoose.model('Empleados', empleadoSchema);
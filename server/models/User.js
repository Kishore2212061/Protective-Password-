const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fixedValue: { type: Number, required: true },
    trigFunction: { type: String, required: true, enum: ['sin', 'cos', 'tan'] },
    keyValue1: { type: Number, required: true }, 
});

const User = mongoose.model('User', userSchema);
module.exports = User;

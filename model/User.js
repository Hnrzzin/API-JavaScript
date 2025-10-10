const mongoose = require('mongoose');

// Schemas do Mongoose: type, required, unique, trim, minlength, maxlength, match, timestamps

const UserSchema = new mongoose.Schema({
    // Definição do esquema do usuário (regras de dominínio)
    name: {
        type: String,
        required: [true, 'Nome é obrigatório'],
        trim: true,
        minlength: [3, 'Nome deve ter pelo menos 3 caracteres'],
        maxlength: [100, 'Nome deve ter no máximo 100 caracteres']
    },
    email: {
        type: String,
        required: [true, 'Email é obrigatório'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/.+\@.+\..+/, 'Por favor, insira um email válido']
    },
    senha: {
        type: String,
        required: [true, 'Senha é obrigatória'],
        minlength: [6, 'Senha deve ter pelo menos 6 caracteres']

    }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
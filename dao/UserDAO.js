const User = require('../model/User');

// Classe para gerenciar operações CRUD no banco de dados MongoDB

class UserDAO {
    // Criar um novo usuário
    async create(userData) {
        try {
            const user = new User(userData);
            return await user.save();
        } catch (error) {
            throw new Error(error.message);
        }
    }
    // Buscar usuário por ID
    async findByID(id) {
        try {
            return await User.findById(id).select('-senha'); // Exclui o campo senha
        } catch (error) {
            throw new Error(error.message);
        }
    }
    // Buscar usuário por email
    async findByEmail(email) {
        try {
            return await User.findOne({ email });
        } catch (error) {
            throw new Error(error.message);
        }
    }
    // Buscar todos os usuários
    async findAll() {
        try {
            return await User.find().select('-senha'); // Exclui o campo senha
        } catch (error) {
            throw new Error(error.message);
        }
    }
    // Atualizar usuário por ID
    async update(id, userData) {
        try {
            return await User.findByIdAndUpdate(id, userData, 
                { new: true,
                 runValidators: true 
                }).select('-senha');
        } catch (error) {
            throw new Error(error.message);
        }
    }
    // Deletar usuário por ID
    async delete(id) {
        try {
            return await User.findByIdAndDelete(id).select('-senha');
        } catch (error) {
            throw new Error(error.message);
        }
    }
    // Buscar usuário por qualquer campo
    async findByField(field, value) {
        try {
            const query = {};
            query[field] = value;
            return await User.find(query).select('-senha');
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = UserDAO;
    
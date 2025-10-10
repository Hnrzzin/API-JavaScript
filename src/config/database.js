const mongoose = require('mongoose');

// Classe para gerenciar a conexão com o banco de dados MongoDB

class Database {
    constructor() {
        this.connection = null;
    }
    // Conectar ao banco de dados
    async connect(){
        try
        {
               this.connection = await mongoose.connect(process.env.MONGO_URI)
            console.log('MongoDB conectado com sucesso!');
        } catch (error) {
            console.error('Erro ao conectar ao MongoDB:', error);
            }
        }
    // Desconectar do banco de dados
    async disconnect() {
        if (this.connection) {
            await mongoose.disconnect();
            console.log('Desconectado do MongoDB');
        }
        }
         
}   
// Exportando a instância da classe Database
module.exports = Database;
    
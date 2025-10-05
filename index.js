// importando as bibliotecas
const e = require('express');
const express = require('express');
const mongoose = require('mongoose');

// Verificando a conexão com o MongoDB
mongoose.connect('mongodb+srv://henry:Henrique2008@usuarios.ksnrebi.mongodb.net/jsapi?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB conectado!'))
  .catch(err => console.error('Erro:', err));

// Definindo o esquema do usuário
const userSchema = new mongoose.Schema({
  nome: String,
  email: { type: String, unique: true },
  senha: String
});

// Criando o modelo do usuário (Transformando em objeto)
const User = mongoose.model('User', userSchema);

// Configurando o Express
const app = express();
app.use(express.json());
const PORT = 5000;

// Rotas
app.get('/list', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({message: "Usuarios listados com sucesso!",data: users});
  }
  catch (error) {
    res.status(400).json({message: 'Erro ao listar usuarios.'});
  }
  
});

app.post('/create', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.json({ message: 'Usuário criado!', data: newUser });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar usuário.'});
  }
});

app.put('/update/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Usuário atualizado!', data: updatedUser });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar usuário.'});
  }
});

app.delete('/delete/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Usuário deletado!' });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao deletar usuário.'});
  }
});

// Iniciando o servidor
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
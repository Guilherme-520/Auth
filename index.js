require('dotenv').config();
const express = require('express');
const { sequelize } = require('./model/db');
const authRoutes = require('./routes/autenticacao/auth');
const authMiddleware = require('./routes/autenticacao/middleware');
const middlewareEvento = require('./routes/novo/middlewareEvento');

const app = express();
app.use("/uploads", express.static('uploads'));
app.use(express.json());

app.use('/auth', authRoutes);

// Rotas protegidas por tipos de usuário
const evento = require('./routes/evento/evento');
app.use('/evento', authMiddleware(['Editor Chefe']), evento );

// Rotas protegidas por tipos de usuário
const authEvento = require('./routes/evento/authEvento');
app.use('/authEvento', authMiddleware(['Editor Chefe']), authEvento );



// Rotas protegidas por tipos de usuário
const foi = require('./routes/novo/foi');
app.use('/foi', middlewareEvento(['Editor Chefe']), foi );







const PORT = process.env.PORT || 3031;
app.listen(PORT, async () => {
  await sequelize.authenticate();
  console.log(`Server running on port ${PORT}`);
});

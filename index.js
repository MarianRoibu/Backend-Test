const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // import cors
const app = express();
require('dotenv').config(); // import dotenv

const PORT = 4000;

const wishesRouter = require('./wishes');
const uri = process.env.MONGO_URI; // use MONGO_URI from the .env file

app.use(express.json());
app.use(cors()); // use cors middleware
app.use('/', wishesRouter);

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexión a la base de datos establecida'))
  .catch((err) => console.error('Error al conectar con la base de datos:', err));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
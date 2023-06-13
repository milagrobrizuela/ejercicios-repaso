const express = require('express');
const cors = require('cors');
const ArticulosRouter = require('./routes/articulos.router.js');
const VendedoresRouter = require('./routes/vendedores.router.js');
const SucursalesRouter = require('./routes/sucursales.router.js')

const app = express();

// Leer archivo de configuracion
require('dotenv').config();

// Para poder leer json en el body
app.use(express.json()); 

// Configuración de CORS
app.use(cors());

// Para poder usar los routers
app.use(ArticulosRouter);
app.use(VendedoresRouter);
app.use(SucursalesRouter);

// Inicio del servidor
const port = 3001;

app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}.`);
});

module.exports = app;
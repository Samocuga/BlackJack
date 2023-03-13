'use strict'

// Cargar modulos de node para crear el servidor 

var express = require('express');
var bodyParser = require('body-parser');
const { response } = require('express');

// Ejecutar express (http)

var app = express();

// Cargar ficheros rutas 

var Aricle_routes = require('./routes/Articles')

// Middlewares

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});


// Dar profijos a las rutas / Cargar rutas

app.use( Aricle_routes);

// Exportar modulo (fichero actual)

module.exports = app;
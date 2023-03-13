'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3900;


// mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;

// Conexion a nuestra base de datos
mongoose.connect('mongodb://127.0.0.1:27017/BD_BlackJack', { useNewUrlParser: true })
  .then(() =>{
    console.log('La conexion a la base de datos es correcta');

// Crear servidor y ponerme a escuchar peticiones HTTP
    app.listen(port, ()=> {
      console.log('Servidor corriendo en http//localhost:'+port);
    });

  });
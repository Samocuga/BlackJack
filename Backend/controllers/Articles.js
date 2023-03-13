' use strict '

var validator = require('validator');
var fs = require('fs');
var path = require('path');
var Article = require('../models/Articles');
const { exists } = require('../models/Articles');

var controller = {

  DatosPersona: (req, res) => {

    return res.status(200).send({
      Nombre: 'Samuel',
      Apellido: 'Cuello',
      Id: 1000462508
    });
  },

  test: (req,res) => {
    return res.status(200).send({
      message: 'Soy la accion test de mi controllador de articulos'
    });
  },

  Save: (req,res) => {
    // Recoger parametros por post 

    var params = req.body;

    // Validar Datos (Validator)

    try{

      var validate_title = !validator.isEmpty(params.title);
      var validate_content = !validator.isEmpty(params.content);

    }catch (err) {
      return res.status(200).send({
        status: 'error',
        message: 'Faltan datos por enviar'
      });
    }

    if(validate_title && validate_content) { 

    // Crear el objeto a guardar

      var article = new Article();

      // Asignar valores 
      article.title = params.title;
      article.content = params.content;
      article.image = null;

      // Guardar el articulo 

      article.save((err, articleStored) => {

        if(err || !articleStored) {
          return res.status(404).send({
            status: 'error',
            message: 'El articulo no se ha guardado'
          });
        }
        // Devolver una respuesta 
        
        return res.status(200).send({
          status: 'success',
          article: articleStored
        });

      });
    }else {
      return res.status(200).send({
        status: 'error',
        message: 'Los datos no son validos'
      });
    }
    
  },

  getArticles: (req, res) => {

    var query = Article.find({});

    var last = req.params.last;
    if (last || last !=undefined ) {
      query.limit(5);
    }

    // Find
    query.sort('-_id').exec((err, articles) =>{
    
      if(err){    
        return res.status(500).send({
          status: 'error',
          message: 'Error al devolver los articulos'
        });
      }

      if(!articles){    
        return res.status(404).send({
          status: 'error',
          message: 'No se encontraron articulos'
        });
      }

      return res.status(200).send({
        status: 'success',
        articles
      });

    });

  },

  getArticle: (req , res) => {

    // Recoger el id de la url
    var articleId = req.params.id;

    // Comprobar que existe
    if (!articleId || articleId == null)  {

      return res.status(404).send({
        status: 'error',
        message: 'No existe el articulo'
      });

    }
    // Buscar el articulo
    Article.findById(articleId,(err, article) => {

      if (err) {

        return res.status(500).send({
          status: 'error',
          message: 'Error en la devolucion de datos'
        });

      }

      if (!article) {

        return res.status(404).send({
          status: 'error',
          message: 'No existe el articulo'
        });

      }

      // Devolver el articulo (json)
      return res.status(200).send({
        status: 'success',
        article
      });

    });

  },

  update: (req, res) => {
    // Recoger la id por la url
    var articleId = req.params.id;

    // Recoger los datos que  llegan 
    var params = req.body;

    // Validar los datos 
    try{
      var validate_title = !validator.isEmpty(params.title);
      var validate_content = !validator.isEmpty(params.content);
    }catch (err){
      return res.status(404).send({
        status: 'error',
        message: 'Faltan  datos por enviar'
      });
    }

    if (validate_title && validate_content) {
      // Find and update
      Article.findOneAndUpdate({_id: articleId}, params, {new: true}, (err, articleUpdated)  =>{
        if (err) {
          return res.status(500).send({
            status: 'error',
            message: 'Error al actualizar'
          });
        }

        if (!articleUpdated) {
          return res.status(404).send({
            status: 'error',
            message: 'No existe el articulo'
          });
        }

        return res.status(200).send({
          status: 'success',
          article: articleUpdated
        });

      });
    }else {
      // Devolver respuesta 
      return res.status(404).send({
        status: 'error',
        message: 'Validacion incorrecta'
      });
    }
  
  },

  delete: (req, res) => {

    // Recoger el id  por la URL 
    var articleId = req.params.id;

    // Find And Delete
    Article.findOneAndDelete({_id: articleId}, (err, articleDeleted) => {
      if (err) {
        return res.status(500).send({
          status: 'error',
          message: 'Error al Eliminar'
        });

      }

      if  (!articleDeleted) {
        return res.status(404).send({
          status: 'error',
          message: 'No puede ser eliminado probablemente, No existe el articulo'
        });
      }

      return res.status(200).send({
        status: 'success',
        article :articleDeleted
      });
    })
  
  },

  upload: (req, res) =>{
    // Configurar el modulo connect multiparty router/article.js (Hecho)

    // Recoger el fichero de la peticion 
    var file_name = 'Imagen no subida';

    if (!req.files) {
      return res.status(404).send({
        status: 'error',
        message : file_name
      });
    }
    // Conseguir nombre de la extencion del archivo
    var file_path = req.files.file0.path;
    var file_split = file_path.split('\\');

    // Nombre del archivo
    var file_name = file_split[2];
    
    // Extencion del fichero
    var extencion_split = file_name.split('\.')
    var file_ext = extencion_split[1];

    // Comprobar la extencion, solo imgs, si no el valida borrar el fichero
    if (file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != 'gif') {
      // Borrar el archivo subido
      fs.unlink (file_path, (err) => {
        return res.stataus(200).send({
          status: 'error',
          message: 'La extencion de la imagen no es valida'
        });
      });
    }else {
      // Si todo es valido, sacar id de url
      var articleId = req.params.id;

      // Buscar el articulo, asignarle el nombre de la img y actualizarlo
      Article.findOneAndUpdate({_id: articleId}, {image: file_name}, {new: true}, (err, articleUpdated) => {
        
        if (err || !articleUpdated){
          return res.status(400).send({
            status: 'error',
            message: 'Error al guardar la imagen'
          });
        }

        return res.status(200).send({
          status: 'success',
          article: articleUpdated
          });
        });
      }
    },

    getImage: (req, res) => {
      
      var file = req.params.image;
      var path_file = './upload/articles/' + file;

      fs.exists(path_file, (exists) => {
        if (exists){
          return res.sendFile(path.resolve(path_file));
        }else {
          return res.status(404).send({
            status: 'error',
            message: 'La imagen no existe'
            });
        }
      });
    },

    search: (req, res) =>{
      // Sacar el String a buscar 
      var searchSting = req.params.search
      // Find or
      Article.find({"$or":[
        {"title": {"$regex": searchSting, "$options": "i"}},
        {"content": {"$regex": searchSting, "$options": "i"}}
      ]})
      // Orden que toman los datos 
      .sort([['date', 'descending']])
      //
      .exec ((err, articles) => {

        if (err){
          
          return res.status(500).send({
            status: 'error',
            message: 'No se han encontrado similitudes'
            });
        }

        if (!articles || articles.length <= 0){
          
          return res.status(404).send({
            status: 'error',
            message: 'No hay articulos para mostrar'
            });
        }

        return res.status(200).send({
          status: 'success',
          articles
          });
      });
    },
    
}; // Final del controlador

module.exports = controller;
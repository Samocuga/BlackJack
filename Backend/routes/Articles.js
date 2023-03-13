' use strict '

var express = require('express');
const { default: mongoose } = require('mongoose');
var ArticleController = require('../controllers/Articles');

var router = express.Router();

var multiparty = require('connect-multiparty');
var md_upload = multiparty({uploadDir: './upload/articles'});

// Rutas de prueba 

router.post('/DatosPersona', ArticleController.DatosPersona);
router.get('/test-de-controlador', ArticleController.test);

// Rutas Reales 

router.post('/save', ArticleController.Save);
router.get('/articles/:last?',ArticleController.getArticles);
router.get('/article/:id',ArticleController.getArticle);
router.put('/article/:id',ArticleController.update);
router.delete('/article/:id',ArticleController.delete);
router.post('/upload-img/:id', md_upload, ArticleController.upload);
router.get('/get-img/:image',ArticleController.getImage);
router.get('/search/:search',ArticleController.search);

module.exports = router;
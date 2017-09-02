var express = require('express');
var MongoClient = require('mongodb').MongoClient
var admin = require('../index.js');

const _PORT = 3000;
const _HOST = 'localhost'

const app = express();

MongoClient.connect('mongodb://localhost:27017/Northwind', function (err, db) {
  if (err) throw err

  app.use('/admin', admin(db))

  app.use((req, res, next) => {
    var error = new Error('Not Found');
    error.status = 404;
    next(error)
  });


})


module.exports = app;

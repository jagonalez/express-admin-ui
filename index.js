var express = require('express')
var router = express.Router()
var app = express()
var path = require('path')
var utils = require('./lib/utils')

module.exports = function(db) {
  utils.setDB(db)
  db.listCollections().toArray((err, list) => {
    utils.setCollection(list);
  })
  router.use('/static', express.static(path.join(__dirname, 'static')))
  router.use('/', require('./lib/collections')())
  router.use('/:collection', require('./lib/collection')())
  router.use('/:collection/:id/change', require('./lib/document')())
  return router
}

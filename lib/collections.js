var bodyParser = require('body-parser')
var renderer = require('./render.js')
var ObjectId = require('mongodb').ObjectId
var router = require('express').Router()
var render = renderer.render
var utils = require('./utils')

router.get("/", (req, res) => {
  var list = []
  utils.collection.forEach(c => {
    list.push({
      name: c.name.charAt(0).toUpperCase() + c.name.slice(1),
      link: c.name
    });
  })

  var data = {
    href: req.baseUrl,
    list: list
  }
  var html = renderer.render("collections.html", data)

  res.send(html)
  res.end()

  return

})

module.exports = function() {
  return router
}

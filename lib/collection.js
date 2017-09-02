var router = require('express').Router({mergeParams: true});
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var utils = require('./utils')
var renderer = require('./render.js')
var ObjectId = require('mongodb').ObjectId

router.get("/", (req, res) => {
  showMany(req, res)
})
.post("/", (req, res) => {
  var next = deleteMany(req, res)
  if (!req.body) {
    urlencodedParser(req, res, next)
  } else {
    next()
  }

})

function showMany(req, res) {
  var found = utils.findCollection(req.params.collection)
  utils.db.collection(found.name).find().toArray((err, items) => {
    var data = {
      count: items.length,
      name: found.name.charAt(0).toUpperCase() + found.name.slice(1),
      href: req.baseUrl  + '/' + found.name,
      list: items
    }
    var html = renderer.render("collection.html", data)

    res.send(html)
    res.end()

    return
  })
}

function deleteMany(req, res) {
  return function() {
    var found = utils.findCollection(req.params.collection)
    let idList = []
    req.body['item'].forEach(i => {
      idList.push(new ObjectId(i))
    })

    utils.db.collection(found.name).deleteMany({
      "_id": {
        $in: idList
      }
    })
    .then(r => {
      showMany(req, res)
    })
  }
}

module.exports = function() {
  return router
}

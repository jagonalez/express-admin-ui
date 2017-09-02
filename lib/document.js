var router = require('express').Router({mergeParams: true});
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var utils = require('./utils')
var renderer = require('./render.js')
var ObjectId = require('mongodb').ObjectId

router.get("/", (req, res) => {
  showOne(req, res)
})
.post("/", (req, res) => {
  var next = updateOne(req, res)
  if (!req.body) {
    urlencodedParser(req, res, next)
  } else {
    next()
  }

})
function showOne(req, res) {
  var found = utils.findCollection(req.params.collection)
  var id = new ObjectId(req.params.id)
  utils.db.collection(found.name).findOne({_id: id}, (err, item) => {
    var itemList = []

    Object.keys(item).forEach(key => {
      if (key === '_id')
        return

      var value = item[key]
      var type = typeof value

      if (key.indexOf("id") > 1) {
        //relationship ?

      }
      type = typeof value === "number" ? "number" : "texbox"
      itemList.push({key: key, value: value, type: type})

    })

    var data = {
      parent: found.name.charAt(0).toUpperCase() + found.name.slice(1),
      link: found.name,
      _id: id,
      item: itemList,
    }
    var html = renderer.render("change-item.html", data)

    res.send(html)
    res.end()

    return
  })
}

function updateOne(req, res) {
  return function() {
    var found = utils.findCollection(req.params.collection)
    var id = new ObjectId(req.params.id)
    utils.db.collection(found.name).findOne({_id: id}, (err, item) => {
     let newItem = req.body;

     Object.keys(newItem).forEach(key => {
       if (typeof item[key] === "number" && !isNaN(newItem[key])) {
         newItem[key] = Number(newItem[key])
       }
     })

     utils.db.collection(found.name).updateOne({_id: id}, {$set:newItem})
     .then(r => {
       showOne(req, res)
     })
    })
  }
}

module.exports = function() {
  return router
}

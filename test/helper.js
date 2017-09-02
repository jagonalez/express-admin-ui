module.exports.collection = [
  {name: "test"}
]
module.exports.response = {
  data: {},
  send: function(data) {
    this.data = data
  },
  end: function() {}
}

module.exports.postRequest = {
  params: {
    collection: "test"
  },
  baseUrl: "test",
  body: {
    item: [0, 1, 2]
  }
}

module.exports.request = {
  params: {
    collection: "test"
  },
  baseUrl: "test"
}

module.exports.db = db = {
  deleted: false,
  updated: false,
  collection: function(name) {
    return {find: db.find, deleteMany: db.deleteMany, updateOne: db.updateOne, findOne: db.findOne}
  },
  find: function() {
    return {toArray: db.toArray}
  },
  toArray: function(cb) {
    return cb(null,[{_id: 0}, {_id: 1}, {_id: 2}])
  },
  deleteMany: function() {
    db.deleted = true
    return Promise.resolve()
  },
  updateOne: function() {
    db.updated = true
    return Promise.resolve()
  },
  findOne: function(item, cb) {
    return cb(null,{_id: 0, name: "test"})
  }
}

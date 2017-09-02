var DB = module.exports = {
  db: null,
  get: function() {
    return DB.db
  },
  setDB: function(db) {
    DB.db = db;
  },
  collection: [],
  setCollection: function(list) {
    DB.collection = list;
  },
  findCollection: function(name) {
    return DB.collection.find(c => c.name === name)
  }
}

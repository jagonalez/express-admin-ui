'use strict'

const utils = require('../lib/utils.js')
const expect = require('chai').expect

describe('Utils module', () => {
  describe('"DB"', () => {
    it('should export an object', () => {
      expect(utils).to.be.an('object')
    })
    it('should have a db property', () => {
      expect(utils.db).to.not.be.undefined
    })
    it('should have a collection property', () => {
      expect(utils.collection).to.not.be.undefined
    })
    describe('setDB', () => {
      it ('should set the db context', () => {
        var db = {set: true}
        utils.setDB(db)
        expect(utils.db).to.equal(db)
      })
    })
    describe('setCollection', () => {
      it('should set the collection', () => {
        var collection = [1,2,3]
        utils.setCollection(collection)
        expect(utils.collection).to.equal(collection)
      })
    })
  })
})

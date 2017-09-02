'use strict'

const collection = require('../lib/collection.js')
const expect = require('chai').expect
const utils = require('../lib/utils.js')
const helper = require('./helper.js')
describe('Collection module', () => {
  var router = collection()
  beforeEach(() => {
    utils.setCollection(helper.collection)
    utils.setDB(helper.db)
  })

  afterEach(() => {
    utils.setCollection([])
    utils.setDB(null)
    helper.db.deleted = false
  })

  it('should export a router function', () => {
    expect(collection).to.be.a('function')
  })
  it('should return a view when get is called', () => {
    router.stack.filter(r => r.route.methods.get)[0].route.stack[0].handle(helper.request, helper.response)
    expect(helper.response.data).to.contain('</html>')
  })
  it('should delete and then return a view when post is called', () => {
    router.stack.filter(r => r.route.methods.post)[0].route.stack[0].handle(helper.postRequest, helper.response)
    expect(helper.db.deleted).to.equal(true)
    expect(helper.response.data).to.contain('</html>')
  })
  describe('routes', () => {

    it('should contain 2 routes', () => {
      expect(router.stack.length).to.equal(2)
    })
    it('should contain 1 get method', () => {
      expect(router.stack.filter(r => r.route.methods.get).length).to.equal(1)
    })
    it('should contain 1 post method', () => {
      expect(router.stack.filter(r => r.route.methods.post).length).to.equal(1)
    })
  })
})

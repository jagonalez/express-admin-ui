'use strict'

const collections = require('../lib/collections.js')
const expect = require('chai').expect
const utils = require('../lib/utils.js')
const helper = require('./helper')

describe('Collections module', () => {
  beforeEach(() => {
    utils.setCollection(helper.collection)
  })

  afterEach(() => {
    utils.setCollection([])
  })
  var router = collections()

  it('should export a router function', () => {
    expect(collections).to.be.a('function')
  })
  describe('routes', () => {

    var route = router.stack[0].route
    it('should contain 1 route', () => {
      expect(router.stack.length).to.equal(1)
    })
    it('should have a get method', () => {
      expect(router.stack[0].route.methods.get).to.equal(true)
    })
  })
  it('should return a view when get is called', () => {
    router.stack[0].route.stack[0].handle(helper.request, helper.response)
    expect(helper.response.data).to.contain('</html>')
  })
})

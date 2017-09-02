'use strict'

const collections = require('../lib/collections.js')
const expect = require('chai').expect
const express = require('express')

describe('Collections module', () => {
  it('should export a router function', () => {
    expect(collections).to.be.a('function')
  })
  describe('routes', () => {
    var router = collections()
    var route = router.stack[0].route
    it('should contain 1 route', () => {
      expect(router.stack.length).to.equal(1)
    })
    it('should have a get method', () => {
      expect(router.stack[0].route.methods.get).to.equal(true)
    })
  })
})

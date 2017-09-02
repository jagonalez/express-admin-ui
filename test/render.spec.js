'use strict'

const renderer = require('../lib/render.js')
const expect = require('chai').expect

describe('Render module', () => {
  describe('"templates"', () => {
    it('should contain a list of read templates', () => {
      expect(renderer.templates).to.not.be.undefined;
    })
    it('should have an header.html template', () => {
      expect(renderer.templates['header.html']).to.not.be.undefined;
    })
    it('should have an footer.html template', () => {
      expect(renderer.templates['footer.html']).to.not.be.undefined;
    })
  })
  describe('"render"', () => {
    it('should export a function', () => {
      expect(renderer.render).to.be.a('function')
    })
    it('should return a compiled HTML string', () => {
      expect(renderer.render("header.html")).to.have.string('<!DOCTYPE html>')
    })
  });
})

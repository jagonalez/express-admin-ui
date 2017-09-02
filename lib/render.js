var fs = require('fs')
var Hogan = require('hogan.js')

var templates = [];
var viewsPath = __dirname + '/../views'

fs
.readdirSync(viewsPath)
.filter(file => {
  return file.indexOf(".html") !== 0
})
.forEach(file => {
  templates[file] = fs.readFileSync(viewsPath + '/' + file, 'utf8')
})

function render(file, data) {
  var html = templates['header.html'];
  var template = Hogan.compile(templates[file])

  html += template.render(data)

  html += templates['footer.html']

  return html;
}

function renderTemplate(file, data) {
  var template = Hogan.compile(templates[file])
  return template.render(data)
}

module.exports.render = render
module.exports.renderTemplate = renderTemplate
module.exports.templates = templates

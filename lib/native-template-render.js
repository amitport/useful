const memoize = require('fast-memoize')
const etag = require('etag')
const path = require('path')

module.exports = function nativeTemplateRender ({root, enableCache}) {
  const cache = {}
  root = path.resolve(process.cwd(), root)

  return function nativeTemplateRender (templateName, contentType = 'text/html') {
    const templatePath = `${root}/${templateName}`
    let compiledTemplate
    if (enableCache && cache.hasOwnProperty(templatePath)) {
      compiledTemplate = cache[templatePath]
    } else {
      compiledTemplate = require(templatePath)
      if (enableCache) {
        compiledTemplate = memoize(compiledTemplate)
        cache[templatePath] = compiledTemplate
      } else {
        delete require.cache[require.resolve(templatePath)]
      }
    }
    const body = compiledTemplate(this)
    this.body = body
    this.type = contentType
    this.response.etag = etag(body)
  }
}


const nodemailer = require('nodemailer')
const requireDir = require('require-dir')
const defaultTemplates = Object.values(requireDir('./templates'))
const partial = require('lodash.partial')

const defaultTransport = {
  send (mail, callback) {
    console.log(mail.data)
    callback(null, true)
  }
}

class Mailer {
  constructor ({nodeMailerTransport = defaultTransport} = {nodeMailerTransport: defaultTransport}) {
    this.transporter = nodemailer.createTransport(nodeMailerTransport)
  }

  send (opt) {
    return this.transporter.sendMail(opt)
      .catch((error) => {
        console.warn(`Failed trying to to send an email: ${error.message}`)
        throw error
      })
  }

  applyTemplateAndSend (template, emailContext) {
    return this.send(template.apply(emailContext))
  }

  static bindToTemplateContext (templateContext, templates = defaultTemplates) {
    class MailerWithBoundTemplates extends Mailer {}

    templates
      .forEach((EmailTemplate) => {
        MailerWithBoundTemplates.prototype[`send${EmailTemplate.name}`] =
          partial(Mailer.prototype.applyTemplateAndSend, new EmailTemplate(templateContext))
      })

    return MailerWithBoundTemplates
  }
}

module.exports = () => new (Mailer.bindToTemplateContext({
  from: 'sender',
  siteName: 'My site',
  signatureName: 'My site signature',
  homeUrl: 'http://home.com'
}))()

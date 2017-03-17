const EmailTemplate = require('../email-template')

class AlreadyRegisteredEmail extends EmailTemplate {
  constructor (templateContext) {
    super(templateContext)

    Object.assign(this, {
      subject: `Already signed up at ${this.siteName}`,
      html: `\
<p>
    Hello,
</p>
<p>
    Your email was used in an attempt to register to ${this.siteName} \
    but it is already associated with an existing account.
    If you have forgotten your password, you can recover it using the following <a href="${this.origin}">link</a>.
    Otherwise, you can safely ignore this email.
</p>

<p>
    Best regards,<br>
    ${this.signatureName}
</p>
`,
      text: `\
Hello,

Your email was used in an attempt to register to ${this.siteName} but it is already associated with an existing account.
If you have forgotten your password, you can recover it using the following link: ${this.origin}.
Otherwise, you can safely ignore this email.

Best regards,
${this.signatureName}
`
    })
  }
}

module.exports = AlreadyRegisteredEmail

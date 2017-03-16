const EmailTemplate = require('../email-template')
const assert = require('assert')

class PasswordRecoveryEmail extends EmailTemplate {
  constructor (templateContext) {
    super(templateContext)
    this.subject = `Reset your password at ${this.siteName}`
  }

  applyEmailContext ({to, verificationPath}) {
    assert(verificationPath != null, 'emailContext must include a \'verificationPath\' property')

    const verificationUrl = `${this.homeUrl}/${verificationPath}`

    return {
      verificationUrl,
      html: `\
<p>
    Hello,
</p>
<p>
    Please <a href="${verificationUrl}">click here</a> \
    to reset your ${this.siteName} password for your ${to} account.<br>
    If you didn't ask to reset your password, you can ignore this email.
</p>

<p>
    Best regards,<br>
    ${this.signatureName}
</p>
`,
      text: `\
Hello,

Please follow the following link to reset your ${this.siteName} password for your ${to} account.
${verificationUrl}
If you didn't ask to reset your password, you can ignore this email.

Best regards,
${this.signatureName}
`
    }
  }
}

module.exports = PasswordRecoveryEmail

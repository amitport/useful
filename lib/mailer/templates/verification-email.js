const EmailTemplate = require('../email-template')
const assert = require('assert')

class VerificationEmail extends EmailTemplate {
  constructor (templateContext) {
    super(templateContext)
    this.subject = `Verify your email at ${this.siteName}`
  }

  applyEmailContext ({verificationPath}) {
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
    to verify your email address in ${this.siteName}.<br>
    If you didn't ask to verify this address, you can ignore this email.
</p>

<p>
    Best regards,<br>
    ${this.signatureName}
</p>
`,
      text: `\
Hello,

Please follow the following link to verify your email address in ${this.siteName}.
${verificationUrl}
If you didn't ask to verify this address, you can ignore this email.

Best regards,
${this.signatureName}
`
    }
  }
}

module.exports = VerificationEmail

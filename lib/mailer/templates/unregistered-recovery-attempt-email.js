const EmailTemplate = require('../email-template')

class UnregisteredRecoveryAttemptEmail extends EmailTemplate {
  constructor (templateContext) {
    super(templateContext)

    Object.assign(this, {
      html: `\
<p>
    Hello,
</p>
<p>
    We received an attempt to recover an account associated with you email but did not find such an account.
    If you attempted to sign-in you need to first <a href="${this.homeUrl}">sign-up to ${this.siteName}</a>.<br>
    Otherwise, you can safely ignore this email.
</p>

<p>
    Best regards,<br>
    ${this.signatureName}
</p>
`,
      text: `\
Hello,

We received an attempt to recover an account associated with you email but did not find such an account.
If you attempted to sign-in you need to first sign-up to ${this.siteName} using the following link: ${this.homeUrl}.
Otherwise, you can safely ignore this email.

Best regards,
${this.signatureName}
`
    })
  }
}

UnregisteredRecoveryAttemptEmail.staticTemplateContext = {
  subject: 'Invalid account recovery attempt'
}

module.exports = UnregisteredRecoveryAttemptEmail

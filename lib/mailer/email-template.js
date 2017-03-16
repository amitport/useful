const assert = require('assert');

class EmailTemplate {
  constructor(templateContext) {
    if (templateContext) {
      Object.assign(this, templateContext);
    }
  }

  apply(emailContext) {
    assert('to' in emailContext, 'emailContext must include a \'to\' property');
    const email = Object.assign(
                      {to: emailContext.to},
                      this.constructor.staticTemplateContext,
                      this,
                      emailContext,
                      this.applyEmailContext(emailContext)
                  );

    assert(['from', 'to', 'subject', 'html', 'text'].every(email.hasOwnProperty.bind(email)),
      'email must include all of [\'from\', \'to\', \'subject\', \'html\', \'text\']');

    return email;
  }

  /**
    override-able applyEmailContext(emailContext)
      returns overrides {from, to, subject, html, text} which be merged with 'this' object
  **/
  applyEmailContext() {return {};}
}

EmailTemplate.staticTemplateContext = {};

module.exports = EmailTemplate;
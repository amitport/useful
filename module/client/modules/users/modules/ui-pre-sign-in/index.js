import './sign-in-dialog'
import './register-dialog'

import './email-token-route'
import './eventual-user'
import './auth-popup-close-handler'
import * as componentsArgs from './components/index'

import uiPreSignInModule from './base'

Object.values(componentsArgs).forEach((componentArgs) => {
  uiPreSignInModule.component.apply(uiPreSignInModule, componentArgs)
})

export default uiPreSignInModule.name

import templateUrl from './select-auth-provider.html'

class SelectAuthProvider {
  selectOwn () {
    this.signIn.state = 'own-sign-in'
  }

  selectExternal (providerName) {
    console.log(providerName)
  }
}

export const SelectAuthProviderArgs = ['selectAuthProvider', {
  templateUrl,
  require: {
    signIn: '^'
  },
  controller: SelectAuthProvider
}]
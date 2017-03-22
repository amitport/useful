import templateUrl from './own-sign-in.html'

class OwnSignIn {
  constructor (user) {
    this.user = user;
  }
  signInWithEmail() {
    if (this.emailSignInForm.$invalid) {
      this.emailSignInForm.email.$setTouched()
      return
    }

    this.user.signInWithEmail(this.email) // todo implement this including password
      .then(() => {
        this.signIn.state = 'own-await-email-validation'
      })
      .catch(() => {
        this.emailSignInForm.email.$setValidity('server', false)

        const formFieldWatcher = $scope.$watch(() => this.emailSignInForm.email.$viewValue, (newValue, oldValue) => {
          if (newValue === oldValue) {
            return
          }

          // clean up the server error
          this.emailSignInForm.email.$setValidity('server', true)

          // clean up form field watcher
          formFieldWatcher()
        })
      })
  }
  forgotPassword() {
    this.signIn.state = 'own-forgot-password'
  }
  signUp() {
    this.signIn.state = 'own-sign-up'
  }
}
OwnSignIn.$inject = ['ap.user']

export const OwnSignInArgs = ['ownSignIn', {
  templateUrl,
  require: {
    signIn: '^'
  },
  controller: OwnSignIn
}]
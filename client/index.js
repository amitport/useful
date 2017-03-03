import angular from 'angular'
import userListTemplateUrl from './user-list.html'

const app = angular.module('amitport.users', [])
.service('userService', class {
  constructor($http) {
    this.$http = $http
  }

  getCurrentUser() {
    // todo return anonymous user until we sign in
    return this.$http.get('/api/users/me').then(({data}) => data)
  }

  getAll() {
    return this.$http.get('/api/users').then(({data}) => data)
  }
})
.component('userList', {
  templateUrl: userListTemplateUrl,
  controller: class {
    constructor(userService) {
      this.userService = userService
    }
    $onInit() {
      this.userService.getCurrentUser().then(_ => {
        this.users = _
      })
    }
  }
})

angular.element(() => {
  angular.bootstrap(document, [app.name])
})

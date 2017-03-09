import angular from 'angular'

import usersModule from './modules/users'
import ioModule from './modules/io'

import './index.css'

const app = angular.module('amitport.useful', [usersModule, ioModule])
  .config(['$locationProvider',
    function ($locationProvider) {
      $locationProvider.html5Mode(true).hashPrefix('!')
    }])

angular.element(document).ready(() => {
  angular.bootstrap(document, [app.name])
})

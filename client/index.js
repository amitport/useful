import angular from 'angular'
import usersModule from './modules/users';

import './index.css'

const app = angular.module('amitport.useful', [usersModule])
  .config(['$locationProvider',
    function ($locationProvider) {
      $locationProvider.html5Mode(true).hashPrefix('!');
    }])

angular.element(document).ready(() => {
  angular.bootstrap(document, [app.name])
})

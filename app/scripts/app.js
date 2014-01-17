'use strict';

angular.module('fivefifteenApp', ['fivefifteenApp.directives', 'fivefifteenApp.filters', 'firebase'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/step/:stepName', {
        templateUrl: 'views/step.html',
        controller: 'MainCtrl'
      })
      .when('/preview', {
        templateUrl: 'views/preview.html',
        controller: 'MainCtrl'
      })
      .when('/preview-md', {
        templateUrl: 'views/preview-md.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

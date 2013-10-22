'use strict';

angular.module('fivefifteenApp', ['fivefifteenApp.directives', 'fivefifteenApp.filters'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/success', {
        templateUrl: 'views/success.html',
        controller: 'MainCtrl'
      })
      .when('/learned', {
        templateUrl: 'views/learned.html',
        controller: 'MainCtrl'
      })
      .when('/challenges', {
        templateUrl: 'views/challenges.html',
        controller: 'MainCtrl'
      })
      .when('/projects', {
        templateUrl: 'views/projects.html',
        controller: 'MainCtrl'
      })
      .when('/objectives', {
        templateUrl: 'views/objectives.html',
        controller: 'MainCtrl'
      })
      .when('/feedback', {
        templateUrl: 'views/feedback.html',
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

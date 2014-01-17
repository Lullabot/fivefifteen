'use strict';

angular.module('fivefifteenApp')
  .controller('MainCtrl', function ($scope, $routeParams, Data, Steps) {

    // Simple Data service to persist form values.
    $scope.data = Data;
    // An array of step objects in order.
    $scope.steps = Steps.data;
    // The current state.
    $scope.state = Steps.state;

    if (angular.isDefined($routeParams.stepName)) {
      $scope.state.currentPath = $routeParams.stepName;
      Steps.updateState();
    }
  })

  // scope data is not persistent across views so we use a simple service.
  .factory('Data', function () {
    // This variable holds all of the text used on the site.
    return {};
  })

  .factory('Steps', function($firebase) {
    var url = new Firebase("https://fivefifteen.firebaseio.com/steps"),
        promise = $firebase(url),
        factory = {};

    factory.data = [];
    factory.state = {
      currentStep: {},
      currentPath: '',
      nextPath: ''
    };

    factory.updateState = function () {
      if (angular.isDefined(this.rawData)) {
        this.state.currentStep = this.rawData[this.state.currentPath];
        this.determineNextPath();
      }
    };

    factory.determineNextPath = function() {
      if (!angular.isDefined(this.rawData)) {
        return;
      }
      this.state.currentStep = this.rawData[this.state.currentPath];
      var nextStepNumber = this.state.currentStep.stepNumber + 1;
      if (angular.isDefined(this.data[nextStepNumber])) {
        this.state.nextPath = 'step/' + this.data[nextStepNumber].path;
      }
      else {
        this.state.nextPath = 'preview';
      }
    };

    promise.$on('loaded', function(values) {
      // If we get values, store it both in the scope and Steps.
      if (!angular.isDefined(values)) {
        return;
      }
      factory.rawData = values;
      for (var key in values) {
        var stepNumber = values[key].stepNumber;
        factory.data[stepNumber] = values[key];
      }
      if (!angular.isDefined(factory.state.currentPath)) {
        factory.state.currentPath = factory.data[0].path;
      }
      factory.determineNextPath();
    });

    return factory;
  });

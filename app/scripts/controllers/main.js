'use strict';

angular.module('fivefifteenApp')
  .controller('MainCtrl', ['$scope', '$routeParams', 'Data', 'StepsFactory', 
                  function ($scope,   $routeParams,   Data,   StepsFactory) {
    // Site Name
    $scope.siteName = "FiveFifteen";

    // Simple Data service to persist form values.
    $scope.data = Data;
    // Admin Contact
    $scope.admin = "seth@lullabot.com";
    // Define variable for opening email.
    $scope.sendEmail = function() { sendMail($scope); };
    // An array of step objects in order.
    $scope.steps = StepsFactory.data;
    // The current state.
    $scope.state = StepsFactory.state;

    // Preview function, to concatenate the results of the steps.
    $scope.getPreview = function() {
      var preview = "",
          step, stepName;
      for (stepName in this.steps) {
        step = this.steps[stepName];
        preview += step.title + "\n\n";
        preview += step.text + "\n\n";
        if (angular.isDefined(this.data[step.path])) {
          preview += this.data[step.path] + "\n\n";
        }
      }
      return preview;
    };

    if (angular.isDefined($routeParams.stepName)) {
      $scope.state.currentPath = $routeParams.stepName;
    }
    StepsFactory.updateState();
  }])

  // scope data is not persistent across views so we use a simple service.
  .factory('Data', function () {
    // This variable holds all of the text used on the site.
    return {};
  })

  .controller('HeaderCtrl', ['$scope', '$location', 'StepsFactory', 
                    function ($scope,   $location,   StepsFactory) {
    // Site Name
    $scope.siteName = "5:15";

    // Site Tagline
    $scope.tagLine = "5 minutes to read, 15 minutes to write";

    // App is in progress when you are not on the homepage.
    $scope.inProgress = function(){
      return $location.path() == '/';
    };

    $scope.state = StepsFactory.state;
  }])

  /**
   * A factory for the steps.
   */
  .factory('StepsFactory', ['$firebase', function($firebase) {
    // Set up the firebase object, and create a promise from it.
    var url = new Firebase("https://fivefifteen.firebaseio.com/steps"),
        promise = $firebase(url),
        StepsClass = {};

    // Store the data as an array, so that we can order by step number.
    StepsClass.data = [];
    // Store a state object. We need this to be an object, so that we can have
    // it be updated on $scope when we get the data from the promise.
    StepsClass.state = {
      currentStep: {},
      currentPath: null,
      startPath: null,
      nextPath: null
    };

    /**
     * Store the data from the database in the factory. This does processing to
     * be sure the data is in the order that we need.
     */
    StepsClass.storeData = function (data) {
      // Store the raw object data, which has the path as key, so that we can
      // do look ups by path.
      StepsClass.rawData = data;
      // Now iterate over each item in the object so that we can create an array
      // from the data. We need an array, so that it can be ordered by the step
      // numbers, and so that ng orderBy will work properly.
      for (var key in data) {
        var stepNumber = data[key].stepNumber;
        StepsClass.data[stepNumber] = data[key];
      }

      StepsClass.updateState();
    };

    /**
     * Update the state object on the factory.
     */
    StepsClass.updateState = function () {
      // If we don't have rawData yet, just return.
      if (!angular.isDefined(StepsClass.rawData)) {
        return;
      }
      // If we don't have startPath, set it up.
      if (!StepsClass.state.startPath) {
        StepsClass.state.startPath = 'step/' + StepsClass.data[0].path;
      }
      // If currentPath is not already set on the state, set it now, so that
      // we can determine the next path properly.
      if (!angular.isDefined(StepsClass.state.currentPath)) {
        StepsClass.state.currentPath = StepsClass.data[0].path;
      }
      // If the path doesn't match a step, just return. No further processing
      // necessary.
      if (!angular.isDefined(StepsClass.rawData[StepsClass.state.currentPath])) {
        return;
      }
      // Determine the current step from the current path.
      StepsClass.state.currentStep = StepsClass.rawData[StepsClass.state.currentPath];
      // Now that we have the current step and path, we can determine the next
      // path.
      StepsClass.determineNextPath();
    };

    /**
     * Determine the next path from the current state.
     */
    StepsClass.determineNextPath = function() {
      // If we don't have rawData yet, just return.
      if (!angular.isDefined(StepsClass.rawData)) {
        return;
      }
      // TODO: The next step number, ideally, is one more than the current one.
      // But this is fragile and needs improvement.
      var nextStepNumber = StepsClass.state.currentStep.stepNumber + 1;
      // If we have the nextStepNumber in our data, use it.
      if (angular.isDefined(StepsClass.data[nextStepNumber])) {
        StepsClass.state.nextPath = 'step/' + StepsClass.data[nextStepNumber].path;
      }
      // Otherwise, assume we are going to the end page.
      else {
        StepsClass.state.nextPath = 'preview';
      }
    };

    /**
     * When the promise is loaded, and if we have valid data, store it on the
     * factory class.
     */
    promise.$on('loaded', function(data) {
      // If we get data, store it both in the scope and StepsFactory.
      if (!angular.isDefined(data)) {
        return;
      }
      StepsClass.storeData(data);
    });

    return StepsClass;
  }]);

function sendMail($scope) {
  var mailTo = $scope.admin;
  var subject = $scope.siteName;
  var preview = $scope.getPreview();
  console.log(preview);

  window.location.href = 'mailto:' + mailTo + '?subject=Report from ' + subject + '&body=' + encodeURIComponent(preview);
}

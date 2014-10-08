'use strict';

angular.module('fivefifteenApp')
  .controller('MainCtrl', ['$scope', '$routeParams', '$debounce', 'DataFactory', 'StepsFactory', 'modalService',
                  function( $scope,   $routeParams,   $debounce,   DataFactory,   StepsFactory,   modalService) {
    // Site Name
    $scope.siteName = "FiveFifteen";

    // Simple Data service to persist form values.
    $scope.data = DataFactory.data;
    // Admin Contact
    $scope.admin = "";
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

    /**
     * Present a modal dialog to the user, asking them if they want to load the
     * data from local storage.
     */
    $scope.modal = function() {
      // Callback to be executed if the user chooses to restore the stored data.
      var restore = function () {
        DataFactory.restoreData();
        $scope.data = DataFactory.data;
      };
      // Callback to be executed when the user closes the modal.
      var cancel = function() {
        DataFactory.clearStorage();
      };
      // Options for the modalService.
      var modalOptions = {
        closeButtonText: 'Start Fresh',
        actionButtonText: 'Restore',
        headerText: 'Restore previous session?',
        bodyText: 'It looks like you were already had some work from last time. Would you like to restore that work, or start fresh?'
      };

      modalService.showModal({}, modalOptions).then(restore, cancel);
    };

    if (angular.isDefined($routeParams.stepName)) {
      $scope.state.currentPath = $routeParams.stepName;
      if (DataFactory.storedData && DataFactory.askToRestore()) {
        $scope.modal();
      }
    }

    StepsFactory.updateState();

    // Watch for any changes to data. We debounce this to only run every second.
    $scope.$watch('data', $debounce(DataFactory.save, 1000), true);
  }])


  // Our Data Factory, which uses local storage to save the user's entries.
  .factory('DataFactory', ['localStorageService', function(
                            localStorageService) {
    // The data variable holds all of the text used on the site.
    var dataObject = { "data": {}, "storedData": {} },
        prompted = false;

    /**
     * Save the data to localStorage. This only runs every second or so, thanks
     * to $debounce.
     *
     * @param newData
     *   The new data to be saved.
     * @param oldData
     *   The previous object. Only saves if there is a change.
     */
    dataObject.save = function(newData, oldData) {
      if (newData !== oldData) {
        localStorageService.add('data', newData);
      }
    };

    /**
     * Load the data from localStorage.
     */
    dataObject.load = function() {
      return localStorageService.get('data');
    };

    /**
     * Set the data to what was loaded from local storage.
     */
    dataObject.restoreData = function () {
      if (dataObject.storedData) {
        dataObject.data = dataObject.storedData;
        // Set restored to true.
        prompted = true;
      }
    };

    /**
     * Clear local storage data.
     */
    dataObject.clearStorage = function () {
      localStorageService.remove('data');
      dataObject.storedData = null;
      prompted = true;
    };

    /**
     * Returns true if data was restored from local storage.
     */
    dataObject.askToRestore = function () {
      return !prompted;
    };

    dataObject.storedData = dataObject.load() || false;

    return dataObject;
  }])


  .controller('HeaderCtrl', ['$scope', '$location', 'StepsFactory', 
                    function ($scope,   $location,   StepsFactory) {

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
  var body = encodeURIComponent($scope.getPreview());
  
  window.location.href = 'mailto:' + mailTo + '?subject=Report from ' + subject + '&body=' + body;
}

'use strict';

angular.module('fivefifteenApp.directives', [])
  .directive('clock', ['$timeout', 'DataFactory', function ($timeout, DataFactory) {
    return function (scope, element) {
      var timeoutId,
        current = new Date(),
        elapsed = new Date();

      if (angular.isUndefined(DataFactory.initTime)) {
        DataFactory.initTime = new Date();
      }
      var init = DataFactory.initTime;

      elapsed.setTime(current.getTime() - init.getTime());
      element.text(elapsed.getMinutes() + 'm');

      // Schedule update in one second.
      function updateLater() {
        // Save the timeoutId for canceling.
        timeoutId = $timeout(function() {
          var current = new Date();
          var elapsed = new Date();
          elapsed.setTime(current.getTime() - init.getTime());
          element.text(elapsed.getMinutes() + 'm');
          updateLater(); // schedule another update
        }, 1000);
      }

      // Listen on DOM destroy (removal) event, and cancel the next UI update
      // to prevent updating time after the DOM element was removed.
      element.bind('$destroy', function() {
        $timeout.cancel(timeoutId);
      });

      updateLater(); // kick off the UI update process.
    };
  }]);

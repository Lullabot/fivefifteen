'use strict';

angular.module('fivefifteenApp.directives', [])
  .directive('clock', ['$timeout', 'DataFactory', function (
                        $timeout,   DataFactory) {
    return function (scope, element) {
      var timeoutId; // timeoutId, so that we can cancel the time updates
      if (!DataFactory.initTime) {
        DataFactory.initTime = new Date();
      }
      var init = DataFactory.initTime;
      
      var current = new Date();
      var elapsed = new Date();
      elapsed.setTime(current.getTime() - init.getTime());
      element.text('Minute/s elapsed: ' + elapsed.getMinutes());
      
      // schedule update in one second
      function updateLater() {
        // save the timeoutId for canceling
        timeoutId = $timeout(function() {
          var current = new Date();
          var elapsed = new Date();
          elapsed.setTime(current.getTime() - init.getTime());
          element.text('Minute/s elapsed: ' + elapsed.getMinutes());
          updateLater(); // schedule another update
        }, 1000);
      }
        
      // listen on DOM destroy (removal) event, and cancel the next UI update
      // to prevent updating time ofter the DOM element was removed.
      element.bind('$destroy', function() {
        $timeout.cancel(timeoutId);
      });
 
      updateLater(); // kick off the UI update process.
    };
  }]);

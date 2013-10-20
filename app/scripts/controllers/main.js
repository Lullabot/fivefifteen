'use strict';

angular.module('fivefifteenApp')
  .controller('MainCtrl', function ($scope, Data) {

    // Simple Data service to persist form values.
    $scope.data = Data;
    
    // Used to include the steps.html
    $scope.steps = {
      stops : [
        'success',
        'learned',
        'challenges',
        'projects',
        'objectives',
        'feedback'
      ],
      url: 'views/steps.html'
    };

  })

  // scope data is not persistent across views so we use a simple service.
  .factory('Data', function (dateFilter) {
    return {
      initTime: new Date()
    };
  });

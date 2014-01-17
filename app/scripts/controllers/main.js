'use strict';

angular.module('fivefifteenApp')
  .controller('MainCtrl', function ($scope, Data) {

    // Simple Data service to persist form values.
    $scope.data = Data;

    Data.ref.$on('loaded', function (values) {
      var steps = values;
      $scope.shebang = ""
        + steps.success.title
        + "\n"
        + steps.success.text
        + "\n\n"
        + [Data.success === 'undefined' ? '' : Data.success]
        + "\n\n"
        + steps.learned.title
        + "\n"
        + steps.learned.text
        + "\n\n"
        + [Data.learned === 'undefined' ? '' : Data.learned]
        + "\n\n"
        + steps.challenges.title
        + "\n"
        + steps.challenges.text
        + "\n\n"
        + [Data.challenges === 'undefined' ? '' : Data.challenges]
        + "\n\n"
        + steps.projects.title
        + "\n"
        + steps.projects.text
        + "\n\n"
        + [Data.projects === 'undefined' ? '' : Data.projects]
        + "\n\n"
        + steps.objectives.title
        + "\n"
        + steps.objectives.text
        + "\n\n"
        + [Data.objectives === 'undefined' ? '' : Data.objectives]
        + "\n\n"
        + steps.feedback.title
        + "\n"
        + steps.feedback.text
        + "\n\n"
        + [Data.feedback === 'undefined' ? '' : Data.feedback]
        + "\n\n"
        + "";
    });
  })

  // scope data is not persistent across views so we use a simple service.
  .factory('Data', function ($firebase) {
    // This variable holds all of the text used on the site.
    var url = new Firebase("https://fivefifteen.firebaseio.com/steps");
    return {
      ref: $firebase(url)
    };
  });

'use strict';

angular.module('fivefifteenApp.filters', [])
  .filter('markdown', ['$sce', function($sce) {
    return function(text) {
      if (typeof text !== 'undefined') {
        var converted = marked(text);
        return $sce.trustAsHtml(converted);
      }
    };
  }]);

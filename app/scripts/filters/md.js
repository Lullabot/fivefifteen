'use strict';

angular.module('fivefifteenApp.filters', [])
  .filter('markdown', function() {
    return function(text) {
      if (typeof text !== 'undefined') {
        var converted = marked(text);
        return converted;
      }
    };
  });
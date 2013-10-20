angular.module('fivefifteenApp.filters', [])
  .filter('markdown', function() {
    return function(text, convert) {
      if (typeof text !== 'undefined') {
        var converted = marked(text);
        return converted;
      }
    }
  });
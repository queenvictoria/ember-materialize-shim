/* globals define, M */
(function() {
  function generateModule(name, values) {
    define(name, [], function() {
      'use strict';
      return values;
    });
  }

  generateModule('materialize', { 'default': M });
})();

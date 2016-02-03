// Main object
var diogenes = {};

// Menu
diogenes.menu = {};

// Extend properties
diogenes.extend = function(from, to) {
  for (var prop in from) {
    if (from.hasOwnProperty(prop)) {
      to[prop] = from[prop];
    }
  }
};

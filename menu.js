diogenes.Menu = function(actions) {
  
  this.actions = {};

  var actionId = 1;
  actions.forEach(function(action) {
    var id = 'a' + actionId;
    this.actions[id] = action;
    actionId++;
  }.bind(this));

};

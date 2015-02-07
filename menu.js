diogenes.Menu = function(language) {

  language = language || diogenes.Menu.prototype.en;
  this.actions = this[language];

  //var actionId = 1;
  //actions.forEach(function(action) {
    //var id = 'a' + actionId;
    //this.actions[id] = action;
    //actionId++;
  //}.bind(this));
};

diogenes.Menu.prototype = {};

// Spanish language
diogenes.Menu.prototype.es = {
  give: 'Dar',
  pickUp: 'Coger',
  use: 'Usar',
  open: 'Abrir',
  talkTo: 'Hablar',
  push: 'Empujar',
  close: 'Cerrar',
  lookAt: 'Mirar',
  pull: 'Tirar'
};

// English language
diogenes.Menu.prototype.en = {
  give: 'Give',
  pickUp: 'Pick up',
  use: 'Use',
  open: 'Open',
  talkTo: 'Talk to',
  push: 'Push',
  close: 'Close',
  lookAt: 'Look at',
  pull: 'Pull'
};

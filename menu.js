diogenes.Menu = function(language) {

  language = language || diogenes.Menu.prototype.en;
  this.actions = this[language];

  this.selectedAction = '';
};

diogenes.Menu.prototype = {};

// Select an action from the menu
diogenes.Menu.prototype.selectAction = function(action) {

  // If the action exists, it is selected
  if (this.actions[action]) {
    this.selectedAction = action;
  }
};

// Unselect an action from the menu
diogenes.Menu.prototype.unselectAction = function() {
  this.selectedAction = '';
};

// Check if an action from the menu is selected or not
// TODO: Find a better name for this function
diogenes.Menu.prototype.isSelected = function() {
  if (this.selectedAction === '') {
    return false;
  }

  return true;
};

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

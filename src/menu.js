/**
 * Creates a new Menu
 * @class
 * @param {string} language - The language of the Menu
 * @return {undefined}
 */
diogenes.Menu = function(language) {

  language = language || 'en';
  this.actions = this[language];

  this.selectedAction = '';
};

/**
 * Select an action from the Menu
 *
 * @param {string} action - The key from the actions map
 * @return {undefined}
 */
diogenes.Menu.prototype.selectAction = function(action) {

  // If the action exists, it is selected
  if (this.actions[action]) {
    this.selectedAction = action;
  }
};

/**
 * Unselect an action from the Menu
 *
 * @return {undefined}
 */
diogenes.Menu.prototype.unselectAction = function() {
  this.selectedAction = '';
};

// TODO: Find a better name for this function
/**
 * Check if an action from the Menu is selected or not
 *
 * @return {undefined}
 */
diogenes.Menu.prototype.isSelected = function() {
  if (this.selectedAction === '') {
    return false;
  }

  return true;
};

/**
 * Spanish language 
 *
 * @return {undefined}
 */
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

/**
 * English language 
 *
 * @return {undefined}
 */
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

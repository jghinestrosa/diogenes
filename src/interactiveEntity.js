/**
 * Object that contains the functions related to a InteractiveEntity
 *
 * @return {undefined}
 */

diogenes.InteractiveEntity = {};
diogenes.extend(diogenes.MouseFunctions, diogenes.InteractiveEntity);

/**
 * Listen to a Menu event and handle it using a callback function
 *
 * @param {string} evt - A key of the actions map from Menu
 * @param {callback} callback - Callback to handle the Menu event 
 * @return {undefined}
 */
diogenes.InteractiveEntity.on = function(evt, callback) {
  this[evt] = callback;
};

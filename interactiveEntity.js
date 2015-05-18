/**
 * InteractiveEntity object
 *
 * @return {undefined}
 */
diogenes.InteractiveEntity = Object.create(diogenes.DrawableEntity);

/**
 * Check if the mouse is over the InteractiveEntity object
 *
 * @param {number} x - The x position to draw the InteractiveEntity 
 * @param {number} y - The y position to draw the InteractiveEntity
 * @return {boolean} true if the mouse is over the InteractiveEntity, false if the mouse is not over the InteractiveEntity
 */
diogenes.InteractiveEntity.isMouseOver = function(x, y) {
  if (x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height) {
    return true;
  }

  return false;
};

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

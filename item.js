/**
 * Creates a new Item
 * @class
 * @param {number} id - The id of the Item
 * @param {number} x - The x position to draw the Item
 * @param {number} y - The y position to draw the Item
 * @param {number} width - The width of the Item
 * @param {number} height - The height of the Item
 * @param asset
 * @return {undefined}
 */
diogenes.Item = function(id, x, y, width, height, asset) {
  this.id = id;
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.asset = asset;
};

/**
 * Create the prototype object that inherites from InteractiveEntity
 *
 * @return {undefined}
 */
diogenes.Item.prototype = Object.create(diogenes.InteractiveEntity);


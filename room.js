/**
 * Creates a new Room 
 * @class
 * @param {number} id - The id of the Room
 * @param {number} x - The x position to draw the Room
 * @param {number} y - The y position to draw the Room
 * @param {number} width - The width of the Room
 * @param {number} height - The height of the Room
 * @param asset
 * @param {Object[]} items - The items that are contained in the Room
 * @return {undefined}
 */
diogenes.Room = function(id, x, y, width, height, asset, items) {
  this.id = id;
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.asset = asset;
  this.items = items;
};

/**
 * Creates the prototype object
 *
 * @return {undefined}
 */
diogenes.Room.prototype = {};

/**
 * Draw the Room and all its Items
 *
 * @param {CanvasRenderingContext2D} ctx - Context for the drawing canvas
 * @return {undefined}
 */
diogenes.Room.prototype.draw = function(ctx) {
  ctx.drawImage(this.asset, this.x, this.y, this.width, this.height);
  this.items.forEach(function(item) {
    item.draw(ctx);
  });
};

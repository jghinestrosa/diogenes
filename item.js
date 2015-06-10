diogenes.Item = (function() {

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
  var constructor = function(id, x, y, width, height, asset, drawable, interactive) {

    this.id = id;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.asset = asset;

    this.drawable = drawable;
    this.interactive = interactive;

  };

  constructor.prototype.setDrawable = function(value) {
    this.drawable = value;
  };

  constructor.prototype.setInteractive = function(value) {
    this.interactive = value;
  };

  constructor.prototype.isDrawable = function() {
    return this.drawable;
  };

  constructor.prototype.isInteractive = function() {
    return this.interactive;
  };

  return {
    createItem: function(id, x, y, width, height, asset, extendInfo) {

      // An Item is drawable and interactive by default
      extendInfo = extendInfo || {drawable: true, interactive: true};

      if (extendInfo.drawable) {
        diogenes.extend(diogenes.DrawableEntityFunctions, constructor.prototype);
      }

      if (extendInfo.interactive) {
        diogenes.extend(diogenes.InteractiveEntity, constructor.prototype);
      }

      return new constructor(id, x, y, width, height, asset, extendInfo.drawable, extendInfo.interactive);
    },

  };


}());

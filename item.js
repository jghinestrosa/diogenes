diogenes.Item = function(id, x, y, width, height, asset) {
  this.id = id;
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.asset = asset;
};

diogenes.Item.prototype = Object.create(diogenes.InteractiveEntity);


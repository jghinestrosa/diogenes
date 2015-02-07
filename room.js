diogenes.Room = function(id, x, y, width, height, asset, items) {
  this.id = id;
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.asset = asset;
  this.items = items;
};

diogenes.Room.prototype = {};

// Draw the Room and all its Items
diogenes.Room.prototype.draw = function(ctx) {
  ctx.drawImage(this.asset, this.x, this.y, this.width, this.height);
  this.items.forEach(function(item) {
    item.draw(ctx);
  });
};

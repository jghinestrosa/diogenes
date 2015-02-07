diogenes.InteractiveEntity = Object.create(diogenes.DrawableEntity);

diogenes.InteractiveEntity.isMouseOver = function(x, y) {
  if (x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height) {
    return true;
  }

  return false;
};

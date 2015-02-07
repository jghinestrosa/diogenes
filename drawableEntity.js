diogenes.DrawableEntity = {
  draw: function(ctx) {
    ctx.drawImage(this.asset, this.x, this.y, this.width, this.height);
  }
};

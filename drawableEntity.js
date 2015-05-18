/**
 * DrawableEntity object
 * @namespace
 * 
 * @return {undefined}
 */
diogenes.DrawableEntity = {
  
  /**
   * Draws a DrawableEntity
   *
   * @param {CanvasRenderingContext2D} ctx - Context for the drawing canvas
   * @return {undefined}
   */
  draw: function(ctx) {
    ctx.drawImage(this.asset, this.x, this.y, this.width, this.height);
  }
};

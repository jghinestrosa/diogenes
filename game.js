diogenes.Game = function(canvas, width, height, room, characters, player) {

  // Canvas context
  this.ctx = canvas.getContext('2d');

  // Dimension
  this.width = width;
  this.height = height;

  // Objects
  this.room = room;
  this.characters = characters;
  this.player = player;

  this.draw = function(ctx) {
    this.room.draw(ctx);
  };

  this.run = function() {
    this.draw(this.ctx);
    window.requestAnimationFrame(this.run.bind(this));
  };

  canvas.addEventListener('click', function(e) {
    console.log(e.pageX, e.pageY);
    room.items.forEach(function(item) {
      item.isMouseOver(e.pageX, e.pageY, item.x, item.y, item.x+item.width, item.y+item.height);
    });
  });
};

(function(window, Object) {

  var diogenes = {};

  diogenes.Game = function(canvas, width, height, room, items, characters, player) {

    // Canvas context
    this.ctx = canvas.getContext('2d');

    // Dimension
    this.width = width;
    this.height = height;

    // Objects
    this.room = room;
    this.items = items;
    this.characters = characters;
    this.player = player;

    this.draw = (function(ctx) {

      var drawElement = function(elem) {
        elem.draw(ctx, elem.asset, elem.x, elem.y, elem.width, elem.height);
      };

      return function() {
        drawElement(this.room);
        this.items.forEach(drawElement);
      };

    }(this.ctx));

    this.run = function() {
      this.draw();
      window.requestAnimationFrame(this.run.bind(this));
    };

    canvas.addEventListener('click', function(e) {
      console.log(e.pageX, e.pageY);
      items.forEach(function(item) {
        item.isMouseOver(e.pageX, e.pageY, item.x, item.y, item.x+item.width, item.y+item.height);
      });
    });

  };

  diogenes.DrawableEntity = {
    draw: function(ctx) {
      ctx.drawImage(this.asset, this.x, this.y, this.width, this.height);
    }
  };

  diogenes.InteractiveEntity = Object.create(diogenes.DrawableEntity);

  diogenes.InteractiveEntity.isMouseOver = function(x, y) {
      if (x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height) {
        return true;
      }

      return false;
  };

  diogenes.Room = function(id, x, y, width, height, asset) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.asset = asset;
  };

  diogenes.Room.prototype = Object.create(diogenes.DrawableEntity);


  diogenes.Item = function(id, x, y, width, height, asset) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.asset = asset;
  };

  diogenes.Item.prototype = Object.create(diogenes.InteractiveEntity);

  diogenes.Character = function() {};

  diogenes.Player = function() {};

  // Make the diogenes object global
  window.diogenes = diogenes;

}(window, Object));

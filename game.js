/**
 * Creates a new Game
 * @class
 * @param {Canvas} canvas - The Canvas where the game will be rendered
 * @param {number} width - The width of the canvas
 * @param {number} height - The height of the canvas
 * @param {Menu} menu - The Menu
 * @param {Room} room - The Room
 * @param {Character[]} characters - The characters to be rendered
 * @param {Player} player - The player to be rendered
 * @return {undefined}
 */
diogenes.Game = function(canvas, width, height, menu, room, characters, player) {

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
      
      // Check if the mouse is over an item when the click is done
      var isMouseOver = item.isMouseOver(e.pageX, e.pageY, item.x, item.y, item.x+item.width, item.y+item.height);
      
      if (isMouseOver) {

        // If an action from the menu is selected
        if (menu.isSelected()) {
          
          var selectedAction = menu.selectedAction;

          // Try to use the action on the item
          if (item[selectedAction]) {
            item[selectedAction]();
          }
        }
      }

    });
  });
};

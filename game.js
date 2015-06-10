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
diogenes.Game = function(canvas, width, height, menu, rooms, characters, player) {

  // Canvas context
  this.ctx = canvas.getContext('2d');

  // Dimension
  this.width = width;
  this.height = height;

  // Objects
  this.rooms = {};

  // The first room of the list is active by default
  this.activeRoom = rooms[0];

  rooms.forEach(this.addRoom.bind(this));

  this.characters = characters;
  this.player = player;
  this.menu = menu;

};

diogenes.Game.prototype.init = function(activeRoomId) {

  if (activeRoomId) {
    this.loadRoom(activeRoomId);
  }

  canvas.addEventListener('click', this.handleClicks.bind(this));
};

diogenes.Game.prototype.run = function() {
  this.draw(this.ctx);
  window.requestAnimationFrame(this.run.bind(this));
};

diogenes.Game.prototype.draw = function(ctx) {
  this.activeRoom.draw(ctx);
};

diogenes.Game.prototype.addRoom = function(room) {
  this.rooms[room.id] = room;
};

diogenes.Game.prototype.loadRoom = function(idRoom) {
  this.activeRoom = this.rooms[idRoom];
};

diogenes.Game.prototype.handleClicks = function(e) {
  console.log(e.pageX, e.pageY);

  var clickHandled = false;

  if (!this.handleIfClickIsOverItem(e)) {

  }

};

// Check if the click has been done over an interactive it
diogenes.Game.prototype.handleIfClickIsOverItem = function(e) {
  this.activeRoom.items.forEach(function(item) {

    if (item.isInteractive()) {

      // Check if the mouse is over an item when the click is done
      var isMouseOver = item.isMouseOver(e.pageX, e.pageY, item.x, item.y, item.x, item.width, item.height);

      if (isMouseOver) {

        // If an action from the menu is selected
        if (this.menu.isSelected()) {
          var selectedAction = this.menu.selectedAction;

          // Try to use the action on the item
          if (item[selectedAction]) {
            item[selectedAction]();
          }
        }

        return true;
      }
    }

  }.bind(this));

  return false;
};


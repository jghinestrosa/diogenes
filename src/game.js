'use strict';

var Promise = require('bluebird');

function create(params) {
  let {canvas, rooms} = params;

  let ctx = canvas.getContext('2d');
  let currentRoom;

  function loop() {
    window.requestAnimationFrame(loop);
    update();
    paint(ctx);
  }

  function update() {
  
  }

  function paint(ctx) {
    currentRoom.paint(ctx);
  }

  function loadRoomsBackgrounds() {
    return Promise.all(rooms.map(room => {
      return room.loadBackground();
    }));
  }

  function startLoop() {
    window.requestAnimationFrame(loop);
  }

  return {
    getCanvas() {
      return canvas;
    },

    getRooms() {
      return rooms;
    },

    getCurrentRoom() {
      return currentRoom;
    },

    setCurrentRoom(room) {
      currentRoom = room;
    },

    run() {
      loadRoomsBackgrounds()
        .then(startLoop);
    }
  };
}

module.exports = {
  create
};

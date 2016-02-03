'use strict';

var Promise = require('bluebird');

function create(params) {
  var canvas = params.canvas;
  var rooms = params.rooms;

  var ctx = canvas.getContext('2d');
  var currentRoom = undefined;

  function loop() {
    window.requestAnimationFrame(loop);
    update();
    paint(ctx);
  }

  function update() {}

  function paint(ctx) {
    currentRoom.paint(ctx);
  }

  function loadRoomsBackgrounds() {
    return Promise.all(rooms.map(function (room) {
      return room.loadBackground();
    }));
  }

  function startLoop() {
    window.requestAnimationFrame(loop);
  }

  return {
    getCanvas: function getCanvas() {
      return canvas;
    },
    getRooms: function getRooms() {
      return rooms;
    },
    getCurrentRoom: function getCurrentRoom() {
      return currentRoom;
    },
    setCurrentRoom: function setCurrentRoom(room) {
      currentRoom = room;
    },
    run: function run() {
      loadRoomsBackgrounds().then(startLoop);
    }
  };
}

module.exports = {
  create: create
};
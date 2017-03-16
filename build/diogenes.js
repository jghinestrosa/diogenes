(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.diogenes = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.game = exports.item = exports.room = undefined;

var _room = require('./room');

var _room2 = _interopRequireDefault(_room);

var _item = require('./item');

var _item2 = _interopRequireDefault(_item);

var _game = require('./game');

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.room = _room2.default;
exports.item = _item2.default;
exports.game = _game2.default;

},{"./game":2,"./item":3,"./room":4}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function create(params) {
  var canvas = params.canvas,
      rooms = params.rooms;

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

  function loadItemsAssets() {

    // Get all the items from all the rooms
    var items = rooms.reduce(function (previous, current) {
      return previous.concat(current.getItems());
    }, []);

    // TODO: Try to find something better than 'itemWrapper'
    return Promise.all(items.map(function (itemWrapper) {
      return itemWrapper.item.loadAssets();
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
      loadRoomsBackgrounds().then(loadItemsAssets).then(startLoop);
    }
  };
}

exports.default = { create: create };

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function create(params) {

  // TODO: Try to improve the sizes variables names
  var id = params.id,
      name = params.name,
      backgroundWidth = params.backgroundWidth,
      backgroundHeight = params.backgroundHeight,
      backgroundUrl = params.backgroundUrl,
      iconWidth = params.iconWidth,
      iconHeight = params.iconHeight,
      iconUrl = params.iconUrl;

  // Images for painting in a room and in the inventory

  var background = new Image();
  var icon = new Image();

  // TODO: Make this function accesible for any module
  function loadImage(image, url) {
    return new Promise(function (resolve, reject) {
      image.onload = function () {
        resolve();
      };

      image.src = url;
    });
  }

  function paint(ctx, img, x, y, width, height) {
    ctx.drawImage(img, x, y, width, height);
  }

  return {
    getId: function getId() {
      return id;
    },
    getName: function getName() {
      return name;
    },
    getBackgroundWidth: function getBackgroundWidth() {
      return backgroundWidth;
    },
    getBackgroundHeight: function getBackgroundHeight() {
      return backgroundHeight;
    },
    getBackgroundUrl: function getBackgroundUrl() {
      return backgroundUrl;
    },
    getIconUrl: function getIconUrl() {
      return iconUrl;
    },
    setName: function setName(newName) {
      name = newName;
    },
    setBackground: function setBackground(img) {
      background = img;
    },
    setIcon: function setIcon(img) {
      icon = img;
    },
    paintBackground: function paintBackground(ctx, x, y) {
      paint(ctx, background, x, y, backgroundWidth, backgroundHeight);
    },
    paintIcon: function paintIcon(ctx, x, y) {
      paint(ctx, icon, x, y, iconWidth, iconHeight);
    },
    loadAssets: function loadAssets() {
      return Promise.all([loadImage(background, backgroundUrl), loadImage(icon, iconUrl)]);
    }
  };
}

exports.default = { create: create };

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function create(params) {
  var id = params.id,
      name = params.name,
      width = params.width,
      height = params.height,
      backgroundUrl = params.backgroundUrl,
      items = params.items,
      zIndex = params.zIndex;

  items = items || [];

  var background = new Image();

  return {
    getId: function getId() {
      return id;
    },
    getName: function getName() {
      return name;
    },
    getWidth: function getWidth() {
      return width;
    },
    getHeight: function getHeight() {
      return height;
    },
    getBackgroundUrl: function getBackgroundUrl() {
      return backgroundUrl;
    },
    getItems: function getItems() {
      return items;
    },
    getZIndex: function getZIndex() {
      return zIndex;
    },
    addItem: function addItem(item, x, y) {
      items.push({ item: item, x: x, y: y });
    },
    addItems: function addItems(newItems) {
      items.concat(newItems);
    },
    setName: function setName(newName) {
      name = newName;
    },
    setBackground: function setBackground(img) {
      background = img;
    },
    setZIndex: function setZIndex(newZIndex) {
      zIndex = newZIndex;
    },
    paint: function paint(ctx) {
      var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      ctx.drawImage(background, x, y, width, height);

      items.forEach(function (itemWrapper) {
        itemWrapper.item.paintBackground(ctx, itemWrapper.x, itemWrapper.y);
      });
    },
    loadBackground: function loadBackground() {
      return new Promise(function (resolve, reject) {
        background.onload = function () {
          resolve();
        };

        background.src = backgroundUrl;
      });
    }
  };
}

exports.default = { create: create };

},{}]},{},[1])(1)
});
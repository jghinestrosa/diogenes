'use strict';

var Promise = require('bluebird');

function create(params) {
  var id = params.id;
  var name = params.name;
  var width = params.width;
  var height = params.height;
  var backgroundUrl = params.backgroundUrl;
  var items = params.items;

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
    addItem: function addItem(item, x, y) {
      items.push({ item: item, x: x, y: y });
    },
    setName: function setName(newName) {
      name = newName;
    },
    setBackground: function setBackground(img) {
      background = img;
    },
    paint: function paint(ctx) {
      var x = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
      var y = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

      ctx.drawImage(background, x, y, width, height);
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

module.exports = {
  create: create
};
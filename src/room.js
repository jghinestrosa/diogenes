'use strict';

var Promise = require('bluebird');

function create(params) {
  let {id, name, width, height, backgroundUrl, items} = params;

  let background = new Image();

  return {
    getId() {
      return id;
    },

    getName() {
      return name;
    },

    getWidth() {
      return width;
    },

    getHeight() {
      return height;
    },

    getBackgroundUrl() {
      return backgroundUrl;
    },

    getItems() {
      return items;
    },

    addItem(item, x, y) {
      items.push({item, x, y});
    },

    setName(newName) {
      name = newName;
    },

    setBackground(img) {
      background = img;
    },

    paint(ctx, x = 0, y = 0) {
      ctx.drawImage(background, x, y, width, height);
    },

    loadBackground() {
      return new Promise((resolve, reject) => {
        background.onload = function() {
          resolve();
        };

        background.src = backgroundUrl;
      });
    }
  };
}

module.exports = {
  create
};

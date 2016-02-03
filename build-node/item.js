'use strict';

var Promise = require('bluebird');

function create(params) {

  // TODO: Try to improve the sizes variables names
  var id = params.id;
  var name = params.name;
  var backgroundWidth = params.backgroundWidth;
  var backgroundHeight = params.backgroundHeight;
  var backgroundUrl = params.backgroundUrl;
  var iconWidth = params.iconWidth;
  var iconHeight = params.iconHeight;
  var iconUrl = params.iconUrl;

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

module.exports = {
  create: create
};
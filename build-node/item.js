'use strict';

function create(params) {
  var id = params.id;
  var name = params.name;
  var width = params.width;
  var height = params.height;
  var background = params.background;
  var icon = params.icon;

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
    getBackground: function getBackground() {
      return background;
    },
    getIcon: function getIcon() {
      return icon;
    },
    setName: function setName(newName) {
      name = newName;
    },
    setBackground: function setBackground(bg) {
      background = bg;
    },
    setIcon: function setIcon(newIcon) {
      icon = newIcon;
    }
  };
}

module.exports = {
  create: create
};
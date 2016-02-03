'use strict';

function create(params) {
  let {id, name, width, height, background, icon} = params;

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

    getBackground() {
      return background;
    },

    getIcon() {
      return icon;
    },

    setName(newName) {
      name = newName;
    },

    setBackground(bg) {
      background = bg;
    },
    
    setIcon(newIcon) {
      icon = newIcon;
    }
  };
}

module.exports = {
  create
};

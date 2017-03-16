function create(params) {
  let {id, name, width, height, backgroundUrl, items, zIndex} = params;

  items = items || [];

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

    getZIndex() {
      return zIndex;
    },

    addItem(item, x, y) {
      items.push({item, x, y});
    },

    addItems(newItems) {
      items.concat(newItems);
    },

    setName(newName) {
      name = newName;
    },

    setBackground(img) {
      background = img;
    },

    setZIndex(newZIndex) {
      zIndex = newZIndex;
    },

    paint(ctx, x = 0, y = 0) {
      ctx.drawImage(background, x, y, width, height);

      items.forEach(itemWrapper => {
        itemWrapper.item.paintBackground(ctx, itemWrapper.x, itemWrapper.y);
      });
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

export default { create };

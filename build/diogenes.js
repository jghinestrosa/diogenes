// src/room.js
function create(params) {
  const { id, width, height, backgroundUrl } = params;
  let { name, items, zIndex } = params;
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
      items.push({ item, x, y });
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
      items.forEach((itemWrapper) => {
        itemWrapper.item.paintBackground(ctx, itemWrapper.x, itemWrapper.y);
      });
    },
    loadBackground() {
      return new Promise((resolve) => {
        background.onload = () => resolve();
        background.src = backgroundUrl;
      });
    }
  };
}
var room_default = { create };

// src/item.js
function create2(params) {
  const {
    id,
    backgroundWidth,
    backgroundHeight,
    backgroundUrl,
    iconWidth,
    iconHeight,
    iconUrl
  } = params;
  let { name } = params;
  let background = new Image();
  let icon = new Image();
  function loadImage(image, url) {
    return new Promise((resolve) => {
      image.onload = () => resolve();
      image.src = url;
    });
  }
  function paint(ctx, img, x, y, width, height) {
    ctx.drawImage(img, x, y, width, height);
  }
  return {
    getId() {
      return id;
    },
    getName() {
      return name;
    },
    getBackgroundWidth() {
      return backgroundWidth;
    },
    getBackgroundHeight() {
      return backgroundHeight;
    },
    getBackgroundUrl() {
      return backgroundUrl;
    },
    getIconUrl() {
      return iconUrl;
    },
    setName(newName) {
      name = newName;
    },
    setBackground(img) {
      background = img;
    },
    setIcon(img) {
      icon = img;
    },
    paintBackground(ctx, x, y) {
      paint(ctx, background, x, y, backgroundWidth, backgroundHeight);
    },
    paintIcon(ctx, x, y) {
      paint(ctx, icon, x, y, iconWidth, iconHeight);
    },
    loadAssets() {
      return Promise.all([loadImage(background, backgroundUrl), loadImage(icon, iconUrl)]);
    }
  };
}
var item_default = { create: create2 };

// src/game.js
function create3(params) {
  const { canvas, rooms } = params;
  const ctx = canvas.getContext("2d");
  let currentRoom;
  function update() {
  }
  function paint() {
    currentRoom.paint(ctx);
  }
  function loop() {
    window.requestAnimationFrame(loop);
    update();
    paint(ctx);
  }
  function loadRoomsBackgrounds() {
    return Promise.all(rooms.map((room) => room.loadBackground()));
  }
  function loadItemsAssets() {
    const items = rooms.reduce((previous, current) => previous.concat(current.getItems()), []);
    return Promise.all(items.map((itemWrapper) => itemWrapper.item.loadAssets()));
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
      loadRoomsBackgrounds().then(loadItemsAssets).then(startLoop);
    }
  };
}
var game_default = { create: create3 };
export {
  game_default as game,
  item_default as item,
  room_default as room
};

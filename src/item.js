function create(params) {
  // TODO: Try to improve the sizes variables names
  const {
    id,
    backgroundWidth,
    backgroundHeight,
    backgroundUrl,
    iconWidth,
    iconHeight,
    iconUrl
  } = params;
  let {name} = params;

  // Images for painting in a room and in the inventory
  let background = new Image();
  let icon = new Image();

  // TODO: Make this function accesible for any module
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

export default {create};

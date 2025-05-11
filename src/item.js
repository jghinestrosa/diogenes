import { loadImage } from './utils/images/load';

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
  let { name } = params;

  // Images for painting in a room and in the inventory
  const images = {
    background: null,
    icon: null
  };

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
      images.background = img;
    },

    setIcon(img) {
      icon = img;
    },

    paintBackground(ctx, x, y) {
      paint(ctx, images.background, x, y, backgroundWidth, backgroundHeight);
    },

    paintIcon(ctx, x, y) {
      paint(ctx, icon, x, y, iconWidth, iconHeight);
    },

    loadAssets() {
      return Promise.all([loadImage(backgroundUrl), loadImage(iconUrl)]).then(
        ([background, icon]) => {
          images.background = background;
          images.icon = icon;
        }
      );
    }
  };
}

export default { create };

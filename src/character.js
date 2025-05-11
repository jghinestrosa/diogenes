import { loadImage } from './utils/images/load';

function create(params) {
  const { id, spritesheetUrl, width, height, directions } = params;

  let { name } = params;

  const images = {
    spritesheet: null
  };

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

    paint(ctx, x, y) {
      ctx.drawImage(
        images.spritesheet,
        0,
        0,
        width,
        height,
        x,
        y,
        width,
        height
      );
    },

    loadAssets() {
      return loadImage(spritesheetUrl).then((spritesheet) => {
        images.spritesheet = spritesheet;
      });
    }
  };
}

export default { create };

import { loadImage } from './utils/images/load';

function create(params) {
  const {
    id,
    spritesheetUrl,
    width,
    height,
    directions,
    x = 0,
    y = 0
  } = params;

  let { name, isPlayable = false } = params;
  let velocity = 0.5;

  const position = {
    x,
    y
  };

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

    getPosition() {
      return { ...position };
    },

    getVelocity() {
      return velocity;
    },

    setVelocity(newVelocity) {
      velocity = newVelocity;
    },

    setX(x) {
      position.x = x;
    },

    setY(y) {
      position.y = y;
    },

    setPosition(updatedPosition) {
      position.x = updatedPosition.x;
      position.y = updatedPosition.y;
    },

    setPlayable(isPlayableUpdated) {
      isPlayable = isPlayableUpdated;
    },

    getPlayable() {
      return isPlayable;
    },

    update(time) {
      if (this.walkable) {
        this.walkable.update(this, time);
      }
    },

    paint(ctx) {
      ctx.drawImage(
        images.spritesheet,
        0,
        0,
        width,
        height,
        position.x,
        position.y,
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

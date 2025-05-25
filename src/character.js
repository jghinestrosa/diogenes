import { loadImage } from './utils/images/load';

function create(params) {
  const {
    id,
    spritesheet,
    width,
    height,
    directions,
    x = 0,
    y = 0,
    animations,
    orientation
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

  // TODO: Think about naming
  // TODO: Create constants for orientation: NORTH, EAST, WEST, SOUTH...
  const orientationConfig = {
    current: orientation
  };

  const animationsConfig = {
    current: animations.idle[orientationConfig.current] || null,
    index: 0
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

    setOrientation(updatedOrientation) {
      orientationConfig.current = updatedOrientation;
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

    // TODO: Think about using ES5 getters
    getX() {
      return position.x;
    },

    getY() {
      return position.y;
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

        // TODO: Review all this logic about animation handling
        // Maybe another mixin?
        const currentAnimationName = animationsConfig.current;

        if (this.walkable.isWalking(this)) {
          const walkAnimationName =
            animations.walk[orientationConfig.current] || null;

          if (currentAnimationName !== walkAnimationName) {
            animationsConfig.current = walkAnimationName;
            animationsConfig.index = 0;
            return;
          }
        }

        if (!this.walkable.isWalking(this)) {
          const idleAnimationName =
            animations.idle[orientationConfig.current] || null;

          if (currentAnimationName !== idleAnimationName) {
            animationsConfig.current = idleAnimationName;
            animationsConfig.index = 0;
            return;
          }
        }

        const currentAnimation = spritesheet.config[animationsConfig.current];
        animationsConfig.index =
          (animationsConfig.index + 1) % currentAnimation.count;
      }
    },

    paint(ctx) {
      const currentAnimation = spritesheet.config[animationsConfig.current];

      ctx.drawImage(
        images.spritesheet,
        (currentAnimation.column + animationsConfig.index) * width,
        currentAnimation.row * height,
        width,
        height,
        position.x,
        position.y,
        width,
        height
      );
    },

    loadAssets() {
      return loadImage(spritesheet.path).then((spritesheet) => {
        images.spritesheet = spritesheet;
      });
    }
  };
}

export default { create };

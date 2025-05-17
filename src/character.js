import { loadImage } from './utils/images/load';
import { calcLinearMovement } from './physics';
import { calcDirectionVector, normalizeVector } from './math';

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
    y,
    dx: x,
    dy: y,
    updateTimestamp: 0
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

    setVelocity(newVelocity) {
      velocity = newVelocity;
    },

    setPlayable(isPlayableUpdated) {
      isPlayable = isPlayableUpdated;
    },

    walkTo({ x, y }) {
      position.dx = x;
      position.dy = y;
    },

    getPlayable() {
      return isPlayable;
    },

    update(time) {
      if (position.x !== position.dx || position.y !== position.dy) {
        if (!position.updateTimestamp) {
          position.updateTimestamp = time;
        }

        const deltaTime = time - position.updateTimestamp;
        position.updateTimestamp = time;

        const currentPosition = { x: position.x, y: position.y };
        const destinationPosition = { x: position.dx, y: position.dy };

        const directionVector = calcDirectionVector(
          currentPosition,
          destinationPosition
        );
        const normalizedVector = normalizeVector(directionVector);
        const x = calcLinearMovement(
          currentPosition.x,
          normalizedVector.x * velocity,
          deltaTime
        );
        const y = calcLinearMovement(
          currentPosition.y,
          normalizedVector.y * velocity,
          deltaTime
        );

        if (position.dx - position.x < 0) {
          position.x = Math.max(position.dx, x);
        } else if (position.dx - position.x > 0) {
          position.x = Math.min(position.dx, x);
        } else {
          position.x = x;
        }

        if (position.dy - position.y < 0) {
          position.y = Math.max(position.dy, y);
        } else if (position.dy - position.y > 0) {
          position.y = Math.min(position.dy, y);
        } else {
          position.y = y;
        }
      } else {
        position.updateTimestamp = 0;
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

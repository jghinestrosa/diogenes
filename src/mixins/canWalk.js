import { calcLinearMovement } from '../physics';
import { calcDirectionVector, normalizeVector } from '../math';

function Walkable() {
  this.position = {
    dx: 0,
    dy: 0,
    updateTimestamp: 0
  };
}

Walkable.prototype.walkTo = function (entity, { x, y }) {
  const width = entity.getWidth();
  const height = entity.getHeight();

  this.position.dx = x - width / 2;
  this.position.dy = y - height / 2;
};

Walkable.prototype.getValidCoordinate = function (
  current,
  candidate,
  destination
) {
  if (destination - current < 0) {
    return Math.max(destination, candidate);
  } else if (destination - current > 0) {
    return Math.min(destination, candidate);
  } else {
    return candidate;
  }
};

Walkable.prototype.update = function (entity, time) {
  const currentPosition = entity.getPosition();
  const { x: currentX, y: currentY } = currentPosition;
  const { dx, dy } = this.position;

  if (currentX !== dx || currentY !== dy) {
    if (!this.position.updateTimestamp) {
      this.position.updateTimestamp = time;
    }

    const deltaTime = time - this.position.updateTimestamp;
    this.position.updateTimestamp = time;

    const destinationPosition = { x: dx, y: dy };

    const directionVector = calcDirectionVector(
      currentPosition,
      destinationPosition
    );
    const velocity = entity.getVelocity();

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

    const validX = this.getValidCoordinate(currentX, x, dx);
    const validY = this.getValidCoordinate(currentY, y, dy);

    entity.setPosition({ x: validX, y: validY });
  } else {
    this.position.updateTimestamp = 0;
  }
};

export default function canWalk(entity) {
  const walkable = new Walkable();
  entity.walkable = walkable;
  return entity;
}

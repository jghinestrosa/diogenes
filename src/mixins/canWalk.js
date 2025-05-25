import { calcLinearMovement } from '../physics';
import { calcDirectionVector, normalizeVector } from '../math';

function Walkable() {
  this.destination = {
    x: null,
    y: null
  };

  this.updateTimestamp = 0;
}

Walkable.prototype.walkTo = function (entity, { x, y }) {
  const width = entity.getWidth();
  const height = entity.getHeight();

  this.destination.x = x - width / 2;
  this.destination.y = y - height / 2;
  console.log('>> WALKTO', this.destination.x, this.destination.y);
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
  const { x: dx, y: dy } = this.destination;

  if (dx === null || dy === null) {
    return;
  }

  //console.log('>> update', currentX, currentY, dx, dy);

  if (currentX !== dx || currentY !== dy) {
    if (!this.updateTimestamp) {
      this.updateTimestamp = time;
    }

    const deltaTime = time - this.updateTimestamp;
    this.updateTimestamp = time;

    const directionVector = calcDirectionVector(
      currentPosition,
      this.destination
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
    this.destination.x = null;
    this.destination.y = null;
    this.updateTimestamp = 0;
  }
};

Walkable.prototype.isWalking = function (entity) {
  if (this.destination.x == null && this.destination.y == null) {
    return false;
  }

  return (
    entity.getX() !== this.destination.x || entity.getY() !== this.destination.y
  );
};

export default function canWalk(entity) {
  const walkable = new Walkable();
  entity.walkable = walkable;
  return entity;
}

// Returns unitary vector that represents direction
// and sense of the original vector
export function normalizeVector(vector) {
  const vectorLength = calcVectorLength(vector);
  return {
    x: vector.x / vectorLength,
    y: vector.y / vectorLength
  };
}

// Returns the length of a vector
export function calcVectorLength(vector) {
  return Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
}

// Returns the vector of direction of a vector
export function calcDirectionVector(origin, destination) {
  return {
    x: destination.x - origin.x,
    y: destination.y - origin.y
  };
}

import { ref } from 'vue'

export default () => {
  /**
     * Checks if a new position would collide with any existing positions
     * @param {number} left - The left position to check
     * @param {number} top - The top position to check
     * @param {Array<{left: number, top: number}>} existingPositions - Array of existing positions
     * @param {number} [hitbox=100] - The minimum distance required between images
     * @returns {boolean} - Returns true if there's a collision, false otherwise
     */
  function collisionCheck(left, top, existingPositions, hitbox = 100) {
    // If there are no existing positions, there can't be a collision
    if (!existingPositions || existingPositions.length === 0) {
      return false;
    }

    // Check against each existing position
    for (const pos of existingPositions) {
      // Calculate the horizontal and vertical distances
      const xDistance = Math.abs(left - pos.left);
      const yDistance = Math.abs(top - pos.top);

      // Calculate the actual distance between the centers using the Pythagorean theorem
      const distance = Math.sqrt(
        Math.pow(xDistance, 2) + 
        Math.pow(yDistance, 2)
      );

      // If the distance is less than the hitbox, we have a collision
      if (distance < hitbox) {
        return true; // Collision detected
      }
    }

    // If we've checked all positions and found no collisions, return false
    return false;
  }

  /**
   * Finds a valid position for a new image that doesn't collide with existing ones
   * @param {Array<{left: number, top: number}>} existingPositions - Array of existing positions
   * @param {number} containerWidth - Width of the container
   * @param {number} containerHeight - Height of the container
   * @param {number} [hitbox=100] - The minimum distance required between images
   * @returns {{left: number, top: number}} - A valid position for the new image
   */
  function findValidPosition(existingPositions, containerWidth, containerHeight, hitbox = 100) {
    const maxAttempts = 100; // Prevent infinite loops
    let attempts = 0;

    while (attempts < maxAttempts) {
      // Generate random position within container bounds
      // Add padding equal to hitbox size to keep images fully within container
      const left = Math.random() * (containerWidth - hitbox * 2) + hitbox;
      const top = Math.random() * (containerHeight - hitbox * 2) + hitbox;

      if (!collisionCheck(left, top, existingPositions, hitbox)) {
        return { left, top };
      }

      attempts++;
    }

    // If we couldn't find a valid position, return a position at the edge
    // This ensures we always return something, even if it might overlap
    return {
      left: hitbox,
      top: hitbox
    };
  }

  return {
    collisionCheck,
    findValidPosition
  }
}
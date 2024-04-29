import { ref } from 'vue'

export default () => {
 function collisionCheck (left, top, existingPositions) {
  const hitbox = 100;

  for (const pos of existingPositions) {
    const xDistance = Math.abs(left - pos.left)
    const yDistance = Math.abs(top - pos.top)

    // Calculate the distance between the centers of the images
    const distance = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));

    // Calculate the minimum distance at which the images should be apart (hitbox)
    const minDistance = hitbox;

    // if (distance < minDistance) {
    //     return true; // Collision detected
    // }
    return false;
  }
 }
 
 return {
  collisionCheck
 }
}
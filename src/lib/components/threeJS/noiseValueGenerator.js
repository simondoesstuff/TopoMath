import {Noise} from "noisejs";

/**
 * Scales the horizontal component of the noise generator
 */
const horiScale = 0.015;

/**
 * Scales the vertical/horizontal components of the noise generator
 */
const vertiScale = 20;

const noise = new Noise();

export function getNoiseValue(x, y) {
  x *= horiScale;
  y *= horiScale;

  let noiseVal = noise.simplex2(x, y);

  noiseVal *= vertiScale;

  return noiseVal;
}

// the range from [-1, 1] might not be accurate.
export const approximateMax = () => 1 * vertiScale;
export const approximateMin = () => -1 * vertiScale;

/**
 * Update the current seed used by the noise generator
 * @param {*} newSeed
 */
export function updateSeed(newSeed = Math.random()) {
  noise.seed(newSeed);
}

// the seed starts out random
updateSeed(Math.random());
import NoiseJs from "noisejs";
const {Noise} = NoiseJs;

/**
 * Scales the horizontal component of the noise generator
 */
const horiScale = 0.015;

/**
 * Scales the vertical/horizontal components of the noise generator
 */
const vertiScale = 20;

const noise = new Noise();
let cache = {}; // noise values are not re-calculated unless the seed changes

export function getNoiseValue(x, y) {
  x *= horiScale;
  y *= horiScale;

  let noiseVal = cache[`${x}, ${y}`];
  noiseVal ??= noise.simplex2(x, y);
  cache[`${x}, ${y}`] = noiseVal;

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
  cache = {};
  noise.seed(newSeed);
}

// the seed starts out random
updateSeed(Math.random());
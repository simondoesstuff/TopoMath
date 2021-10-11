import { Noise } from "../_snowpack/pkg/noisejs.js";
import * as math from "../_snowpack/pkg/mathjs.js";
import domLog from "./outputUtil.js";
import { transcribeEq } from "./equationInterpreter.js";

let latexString;
let activeEvaluator;

let cachedHeights = [];

const noise = new Noise();
// updateSeed(Math.random());
updateSeed(.9873); // todo reset this back to random

/**
 * Scales the horizontal component of the noise generator
 */
export const horiScale = 0.015;

/**
 * Scales the vertical component of the noise generator
 */
export const vertiScale = 20;

function getNoiseValue(x, y) {
  x *= horiScale;
  y *= horiScale;

  let noiseVal = noise.simplex2(x, y);

  noiseVal *= vertiScale;

  return noiseVal;
}

/**
 * Update the current seed used by the noise generator
 * @param {*} newSeed
 */
export function updateSeed(newSeed = Math.random()) {
  // reset the cache
  cachedHeights = [];
  noise.seed(newSeed);
}

/**
 * Fetch and parse a new latex expression to model the height map
 *
 * @param {string} newLatexString defaults to calling latex() on the #formula MQ element
 * @returns {boolean} false on failed parse. In this case, it resumes using the existing evaluator.
 */
export function update(newLatexString) {
  newLatexString = transcribeEq(newLatexString);
  latexString = newLatexString;

  let parser;

  try {
    parser = math.parse(latexString);
  } catch (e) {
    return false;
  }

  // we need this to duplicate the transforms on x in the left arg in f(x) to match right arg
  //      essentially turning f(3x)   =>   f(3x, 3y)

  parser = parser.transform((node, path, parent) => {
    if (node.type !== "FunctionNode") return node;
    if (node.name !== "f") return node;

    let leftArg = node.args[0];

    // need this because the code can't run without at least one func arg
    if (!leftArg) throw "Missing at least one argument.";

    let rightArg = node.args[1] ?? leftArg;

    // this is here to convert references to 'x' to 'y'
    rightArg = rightArg.transform((node, path, parent) => {
      if (node.type !== "SymbolNode") return node;
      if (node.name !== "x") return node;

      return new math.SymbolNode("y");
    });

    node.args.push(rightArg);

    return node;
  });

  activeEvaluator = parser.compile();
  // reset the cache
  cachedHeights = [];
  return true;
}

/**
 * Get a value on the heightmap. Values are cached.
 *
 * @param {number} x
 * @param {number} y
 * @throws "Failed Evaluation" This could occur, for example, if a user compiles an expression with an undefined variable reference.
 * @returns {number} The height at the coordinates
 */
export function evaluate(x, y) {
  cachedHeights[y] ??= [];

  let val = cachedHeights[y][x];

  if (val === "Failed Evaluation") throw val;

  if (val) return val;

  let scope = {
    x,
    y,

    f: (x, y) => {
      // not sure if I should be throwing an error here to just returning 0

      if (x === "undefined" || y === "undefined") throw "Missing arguments.";
      // return 0;

      return getNoiseValue(x, y);
    },
  };

  try {
    val = activeEvaluator.evaluate(scope);
  } catch (e) {
    cachedHeights[[x, y]] = "Failed Evaluation";
    throw "Failed Evaluation";
  }

  cachedHeights[y][x] = val;
  return val;
}

update();

import * as math from "mathjs";
import {transcribeEq} from "./expressionTranslator.js";
import * as Noise from "./noiseValueGenerator.js";


let activeEvaluator = (scope) => null;

/**
 * Fetch and parse a new latex expression to model the height map
 *
 * @param {string} newLatexString defaults to calling latex() on the #formula MQ element
 * @returns {boolean} false on failed parse. In this case, it resumes using the existing evaluator.
 */
export function newExpression(newLatexString) {
    let exp = transcribeEq(newLatexString);
    let parser;

    try {
        parser = parse(exp);
    } catch (e) {
        // pass
    }

    activeEvaluator = (scope) => parser.evaluate(scope);
}

function parse(latexStr) {
    let parser = math.parse(latexStr);

    // we need this to duplicate the transforms on x in the left arg in f(x) to match right arg
    //      essentially turning f(3x)   =>   f(3x, 3y)

    parser = parser.transform((node, path, parent) => {
        // variables other than x or y are allowed to flow through the system, but
        // the evaluator we compile will not have a value for them so it will throw
        // an error which will ultimately result in an unchanging plane. (thats fine)

        if (node.type !== "FunctionNode") return node;
        if (node.name !== "f") return node;

        // we are left with a function node named 'f'...

        // need this because the code can't run without at least one func arg
        if (node.args.length < 1) throw "Missing at least one argument.";

        let leftArg = node.args[0];
        let rightArg = node.args[1];

        if (rightArg == null) {
            // if the right arg isnt provided, convert variables of x
            // in the left arg to y and use it as the right arg instead.

            rightArg = leftArg;

            // this is here to convert references to 'x' to 'y'
            rightArg = rightArg.transform((node, path, parent) => {
                if (node.type !== "SymbolNode") return node;
                if (node.name !== "x") return node;

                return new math.SymbolNode("y");
            });
        }

        node.args.push(rightArg);

        return node;
    });

    return parser.compile();
}

/**
 * Get a value on the heightmap. Values are cached.
 *
 * @param {number} x
 * @param {number} y
 * @returns {number} The height at the coordinates or null on failed evaluation.
 */
export function evaluateAt(x, y) {
    let scope = {
        x,
        y,

        f: (x, y) => {
            // not sure if I should be throwing an error here to just returning 0

            if (x === "undefined" || y === "undefined") throw "Missing arguments.";
            // return 0;

            return Noise.getNoiseValue(x, y);
        },
    };

    let v;

    try {
        v = activeEvaluator(scope);
    } catch (e) {
        v = null;
    }

    return v;
}

/**
 * Returns (approximately) the maximum height value to be produced
 */
export function approximateMax() {
    const x = 0;    // setting these to 0 because they should be irrelevant here
    const y = 0;    // setting these to 0 because they should be irrelevant here

    let scope = {
        x,
        y,

        f: (x, y) => {
            // not sure if I should be throwing an error here to just returning 0

            if (x === "undefined" || y === "undefined") throw "Missing arguments.";
            // return 0;

            // here we are forcing the noise generator to give us a max value
            return Noise.approximateMax();
        },
    };

    let v;

    try {
        v = activeEvaluator(scope);
    } catch (e) {
        v = null;
    }

    return v;
}

/**
 * Returns (approximately) the maximum height value to be produced
 */
export function approximateMin() {
    const x = 0;    // setting these to 0 because they should be irrelevant here
    const y = 0;    // setting these to 0 because they should be irrelevant here

    let scope = {
        x,
        y,

        f: (x, y) => {
            // not sure if I should be throwing an error here to just returning 0

            if (x === "undefined" || y === "undefined") throw "Missing arguments.";
            // return 0;

            // here we are forcing the noise generator to give us a max value
            return Noise.approximateMin();
        },
    };

    let v;

    try {
        v = activeEvaluator(scope);
    } catch (e) {
        v = null;
    }

    return v;
}

/**
 * Scales a value between the absolute
 * min and max of the height map.
 * @param value
 * @return Number percentage
 */
export function normalizeValue(value) {
    let min = approximateMin();
    let max = approximateMax();

    max -= min;
    value -= min;

    if (max === 0) return 0;

    return value / max;
}
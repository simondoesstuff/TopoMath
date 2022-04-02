let filters = [];

/**
 * Convert a math formula in LaTeX form to ascii math.
 * Does not cache. Pure method.
 *
 * @param {string} latexString A math formula string in LaTeX form
 */
export function transcribeEq(latexString) {
    let str = "";

    latexString = latexString.replaceAll('{', '(');
    latexString = latexString.replaceAll('}', ')');

    while (latexString.length !== 0) {
        let result;

        for (const filter of filters) {
            let filterSuccess = filter(latexString);

            if (filterSuccess) {
                result = filterSuccess;
            }
        }

        if (result) {
            let {strAddition, chopOff} = result;
            latexString = latexString.substr(chopOff);
            str += strAddition;

            continue;
        }

        // did not find result

        str += latexString[0];
        latexString = latexString.substring(1);
    }

    return str;
}

// ----------------------------------
//             Filters
//
//   before these run, {} turn to ()
// ----------------------------------

//   x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}

const _groups = /^\\(?:left|right)([()|])/;     // 1 group
const _pm = /^\\pm/;                            //   none
const _sqrt = /^\\sqrt{(.*)}/;                  // 1 group
// const _power = /^\^(?:{(.*)}|(.))/;          // 2 groups
const _frac = /^\\frac/;                        // 2 groups
const _mult = /^\\cdot/;                        //   none

// parenthesis & abs bars
filters.push(exp => {
    let match = exp.match(_groups);
    if (!match) return;

    let strAddition = match[1];

    return {
        strAddition,
        chopOff: match[0].length
    };
});

// pm
filters.push(exp => {
    let match = exp.match(_pm);
    if (!match) return;

    let strAddition = '+';

    return {
        strAddition,
        chopOff: match[0].length
    };
});

// mult
filters.push(exp => {
    let match = exp.match(_mult);
    if (!match) return;

    let strAddition = '*';

    return {
        strAddition,
        chopOff: match[0].length
    };
});

// frac
filters.push(exp => {
    let match = exp.match(_frac);
    if (!match) return;

    function scan(exp, startingIndex) {
        let depth = 0

        for (let i = startingIndex; i < exp.length; i++) {
            let ichar = exp.charAt(i)

            if (ichar === '(')
                depth++
            else if (ichar === ')')
                depth--

            if (depth === 0) {
                return exp.substring(startingIndex, i + 1)
            }
        }

        throw "Invalid expression. Missing \\frac arguments."
    }

    let numerator = scan(exp, match.index + match[0].length)
    let denominator = scan(exp, match.index + match[0].length + numerator.length)

    let strAddition = `(${numerator}/${denominator})`

    return {
        strAddition,
        chopOff: match[0].length + numerator.length + denominator.length
    };
});

// sqrt
filters.push(exp => {
    let match = exp.match(_sqrt);

    if (!match) return;

    let strAddition = `sqrt(${match[1]})`

    return {
        strAddition,
        chopOff: match[0].length
    };
});

// power
// filters.push(exp => {
// 	let match = exp.match(_power);

// 	  if (!match) return;

//       // only one of match[1] or match[2] should be defined.
//       // as an unnecessary precaution, I prioritize 2 over 1
//       // in this impossible scenario.
//       let strAddition = `^(${match[2] ?? match[1]})`

// 	  return {
// 	    strAddition,
// 	    chopOff: match[0].length
// 	  };
// });
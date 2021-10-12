import { lazyLog } from "./outputUtil";

const mqLatex = MQ($("#formula")[0]);

let filters = [];

/**
 * Convert a math formula in LaTeX form to ascii math.
 * Does not cache. Pure method.
 * 
 * @param {string} latexString A math formula string in LaTeX form
 */
export function transcribeEq(latexString = mqLatex.latex()) {
    let str = "";

    latexString = latexString.replace(/{/, '(');
    latexString = latexString.replace(/}/, ')');

    while (latexString.length != 0) {
        let result = fullFilter(latexString);

        if (result) {
            let { strAddition, chopOff } = result;
            latexString = latexString.substr(chopOff);
            str += strAddition;

            continue;
        }

        // did not find result

        str += latexString[0];
        latexString = latexString.substring(1);
    }

    lazyLog('str: ' + str);
    return str;
}

function fullFilter(exp) {
    for (const filter of filters) {
        let result = filter(exp);

        if (!result) {
            continue;
        }

        return result;
    }
}

// ----------------------------------
//             Filters
//
//   before these run, {} turn to ()
// ----------------------------------

    //   x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}

const _groups = /^\\(?:left|right)(\(|\)|\|)/;      // 1 group
const _pm = /^\\pm/;                                //   none
// const _sqrt = /^\\sqrt{(.*)}/;                      // 1 group
// const _power = /^\^(?:{(.*)}|(.))/;                 // 2 groups
const _frac = /^\\frac/;                // 2 groups
const _mult = /^\\cdot/;                            //   none

// parathensis & abs bars
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



      

      let strAddition = `((${match[1]})/(${match[2]}))`
      
      return {
        strAddition,
        chopOff: match[0].length
      };

});

// sqrt
// filters.push(exp => {
// 	let match = exp.match(_sqrt);

// 	  if (!match) return;

//       let strAddition = `sqrt(${match[1]})`
	  
// 	  return {
// 	    strAddition,
// 	    chopOff: match[0].length
// 	  };
// });

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
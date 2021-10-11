const mqLatex = MQ($("#formula")[0]);

const _pm = /^\\pm/;

/**
 * Convert a math formula in LaTeX form to ascii math.
 * Does not cache. Pure method.
 * 
 * @param {string} latexString A math formula string in LaTeX form
 */
export function transcribeEq(latexString = mqLatex.latex()) {
    let str = "";

    //   x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}

    // while (latexString.length != 0) {
    //     let match;

    //     match = latexString.match(_pm);

    //     if (match) {
    //         str += ""
    //     }
    // }



    // todo finish this
            // todo ... and remove this line:
    str = latexString;

    return str;
}
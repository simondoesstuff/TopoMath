import("../_snowpack/pkg/mathquill/build/mathquill.css.proxy.js")
import("./style.css.proxy.js")

import * as Graphics from './graphics.js'
import * as HeightMap from './heightMap.js'
import domLog from './outputUtil.js';

let formula = $('#formula')[0]
let mqForm = MQ(formula);

mqForm.data.onEditHandlers.push((newLatex) => {
    Graphics.updatePlane();
})

// 5pm - 8
// 12am - 2
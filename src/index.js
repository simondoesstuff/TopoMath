import('mathquill/build/mathquill.css')
import('./style.css')

import * as Graphics from './graphics'
import * as HeightMap from './heightMap'
import domLog from './outputUtil';

let formula = $('#formula')[0]
let mqForm = MQ(formula);

mqForm.data.onEditHandlers.push((newLatex) => {
    Graphics.updatePlane();
})

// 5pm - 8
// 12am - 2
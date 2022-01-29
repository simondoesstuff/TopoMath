import('./mathquill.css')
import('./style.css')

import * as Graphics from './graphics'
import domLog from './outputUtil';

let formula = $('#formula')[0]
let mqForm = MQ(formula);

mqForm.data.onEditHandlers.push((newLatex) => {
    Graphics.updatePlaneExpression(newLatex);
})
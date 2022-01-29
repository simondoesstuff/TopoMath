const latestBox = $('#latest')
const consoleBox = $('#console')

export function domLog(msg) {
    msg ??= "";

    console.log('DOMLog: ' + msg);

    latestBox.text(msg);
    consoleBox.append(msg + '<br/>');
}


// lazyLog

let lastSend = 0;
let lazyQueue = [];

/**
 * Does not call domLog (doesnt update dom, only console).
 * @param msg
 */
export function lazyLog(msg) {
    let delta = Date.now() - lastSend;

    if (delta <= 100) {
        lazyQueue.push(msg);
        return;
    }

    lazyQueue.push(msg);

    console.log(lazyQueue.join('\n'));
    lazyQueue = [];

    lastSend += delta;
}

export default domLog;
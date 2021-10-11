const latestBox = $('#latest')
const consoleBox = $('#console')

export function domLog(msg) {
    msg ??= "";

    console.log('DOMLog: ' + msg);

    latestBox.text(msg);
    consoleBox.append(msg + '<br/>');
}

export default domLog;
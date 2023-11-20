const { getErrorLine, getCurrentDateFormatted, getCurrentTimeFormatted } = require('../lib/helper');
const path = require('path');
const fs = require('fs');

function internalErrorCatcher(error) {
    const nowDate = getCurrentDateFormatted();
    const nowTime = getCurrentTimeFormatted();

    const errorFile = getErrorLine(error);

    const checkIfFileExistsError = fs.existsSync(path.join(process.cwd(), `/log/_internalError/error/${nowDate}.txt`));
    if (!checkIfFileExistsError) {
        fs.writeFileSync(path.join(process.cwd(), `/log/_internalError/error/${nowDate}.txt`), '');
    }

    const result = `${nowTime} ${nowDate} +0000 "${error instanceof Error ? errorFile : error}" ↓\n${error.stack}‼`;

    let readFile = fs.readFileSync(path.join(process.cwd(), `/log/_internalError/error/${nowDate}.txt`));
    readFile = readFile.toString().length ? readFile + '\n' + result : result;
    fs.writeFileSync(path.join(process.cwd(), `/log/_internalError/error/${nowDate}.txt`), readFile);
}

module.exports = {
    internalErrorCatcher,
};

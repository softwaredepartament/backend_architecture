const { getErrorLine, getCurrentDateFormatted, getCurrentTimeFormatted } = require('../lib/helper');
const { randomUUID } = require('crypto');
const path = require('path');
const fs = require('fs');

function internalErrorCatcher(error) {
    const nowDate = getCurrentDateFormatted();
    const nowTime = getCurrentTimeFormatted();

    const errorFile = getErrorLine(error);

    const checkIfFileExistsError = fs.existsSync(path.join(process.cwd(), `/log/_internalError/${nowDate}.json`));
    if (!checkIfFileExistsError) {
        fs.writeFileSync(path.join(process.cwd(), `/log/_internalError/${nowDate}.json`), JSON.stringify([]));
    }

    let newLog = {
        log_id: randomUUID(),
        log_type: 'error',
        log_module: '_internalError',
        log_time: nowTime,
        log_date: nowDate,
        log_error_description: error instanceof Error ? errorFile : error,
        log_error_stack: error.stack,
    };

    let readFile = fs.readFileSync(path.join(process.cwd(), `/log/_internalError/${nowDate}.json`));
    readFile = JSON.parse(readFile);
    readFile.push(newLog);
    fs.writeFileSync(path.join(process.cwd(), `/log/_internalError/${nowDate}.json`), JSON.stringify(readFile));
}

module.exports = {
    internalErrorCatcher,
};

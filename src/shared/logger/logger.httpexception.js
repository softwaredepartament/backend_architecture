const { getCurrentDateFormatted, getCurrentTimeFormatted } = require("../lib/helper");
const { internalErrorCatcher } = require("./logger.internal");
const path = require('path')
const fs = require('fs');

function httpExceptionLogWriter(status, message, error, body) {
    try {
        const nowDate = getCurrentDateFormatted();
        const nowTime = getCurrentTimeFormatted();

        const checkIfFileExistsError = fs.existsSync(path.join(process.cwd(), `/log/_httpException/error/${nowDate}.txt`));
        if (!checkIfFileExistsError) {
            fs.writeFileSync(path.join(process.cwd(), `/log/_httpException/error/${nowDate}.txt`), '');
        }

        const result = `${nowTime} ${nowDate} +0000 ↓\nstatus = ${status} && message = ${message} && error = ${error} ▄\n${JSON.stringify(body, null, 4)}‼`;

        let readFile = fs.readFileSync(path.join(process.cwd(), `/log/_httpException/error/${nowDate}.txt`));
        readFile = readFile.toString().length ? readFile + '\n' + result : result;
        fs.writeFileSync(path.join(process.cwd(), `/log/_httpException/error/${nowDate}.txt`), readFile);
    } catch (error) {
        internalErrorCatcher(error)
    }
}

module.exports = {
    httpExceptionLogWriter
}
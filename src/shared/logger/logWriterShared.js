const { getCurrentDateFormatted, getCurrentTimeFormatted } = require('../../lib/helpers');
const { HttpException, errors } = require('../../lib/httpException');
const path = require('path');
const fs = require('fs');

function logWriter(module, statusCode, host, method, url, userAgent, body, res) {
    try {
        if (statusCode == 500) {
            return '';
        }
        const logType = statusCode >= 200 && statusCode <= 299 ? 'success' : 'error';

        const nowDate = getCurrentDateFormatted();
        const nowTime = getCurrentTimeFormatted();

        if (module[0] == '_') {
            const checkIfFileExistsError = fs.existsSync(path.join(process.cwd(), `/log/${module}/error/${nowDate}.txt`));
            if (!checkIfFileExistsError) {
                fs.writeFileSync(path.join(process.cwd(), `/log/${module}/error/${nowDate}.txt`), '');
            }
        }

        const result = `${nowTime} ${nowDate} +0000 ${method.padEnd(7, ' ')}${statusCode} ${url} → ${host} - "${userAgent}" ↓\nbody:${JSON.stringify(
            body,
            null,
            4,
        )}↔res:${JSON.stringify(res, null, 4)}‼`;

        let readFile = fs.readFileSync(path.join(process.cwd(), `/log/${module}/${logType}/${nowDate}.txt`));
        readFile = readFile.toString().length ? readFile + '\n' + result : result;
        fs.writeFileSync(path.join(process.cwd(), `/log/${module}/${logType}/${nowDate}.txt`), readFile);
    } catch (error) {
        new HttpException(500, `Syntax error ${error}`, errors.INTERNAL_SERVER_ERROR, 'logWriter');
    }
}

function httpExceptionLogWriter(module, functionName, status, message, error) {
    try {
        const nowDate = getCurrentDateFormatted();
        const nowTime = getCurrentTimeFormatted();

        const checkIfFileExistsError = fs.existsSync(path.join(process.cwd(), `/log/${module}/error/${nowDate}.txt`));
        if (!checkIfFileExistsError) {
            fs.writeFileSync(path.join(process.cwd(), `/log/${module}/error/${nowDate}.txt`), '');
        }

        const result = `${nowTime} ${nowDate} +0000 ${functionName} ↓\nstatus = ${status} && message = ${message} && error = ${error}‼`;

        let readFile = fs.readFileSync(path.join(process.cwd(), `/log/${module}/error/${nowDate}.txt`));
        readFile = readFile.toString().length ? readFile + '\n' + result : result;
        fs.writeFileSync(path.join(process.cwd(), `/log/${module}/error/${nowDate}.txt`), readFile);
    } catch (error) {
        console.log(error);
        new HttpException(500, `Syntax error ${error}`, errors.INTERNAL_SERVER_ERROR, 'httpExceptionLogWriter');
    }
}

module.exports = {
    logWriter,
    httpExceptionLogWriter
};

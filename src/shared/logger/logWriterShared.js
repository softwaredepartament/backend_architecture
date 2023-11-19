const { getCurrentDateFormatted, getCurrentTimeFormatted } = require('../../lib/helpers');
const { HttpException, errors } = require('../../lib/httpException');
const path = require('path');
const fs = require('fs');
const { internalErrorCatcher } = require('./logger.internal');

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
        internalErrorCatcher(error)
    }
}

module.exports = {
    logWriter
};
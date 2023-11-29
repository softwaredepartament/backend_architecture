const { getCurrentDateFormatted, getCurrentTimeFormatted } = require('./../lib/helper');
const { internalErrorCatcher } = require('./logger.internal');
const { randomUUID } = require('crypto');
const path = require('path');
const fs = require('fs');

function logPsqlWriter(statusCode, method, query, errorLine) {
    try {
        const logType = statusCode === 200 ? 'success' : 'error';

        const nowDate = getCurrentDateFormatted();
        const nowTime = getCurrentTimeFormatted();

        let newLog = {
            log_id: randomUUID(),
            log_type: logType,
            log_module: '_psql',
            log_time: nowTime,
            log_date: nowDate,
            log_request_method: method,
            log_request_query: query,
            log_request_error_line: errorLine,
        };

        let readFile = fs.readFileSync(path.join(process.cwd(), `/log/_psql/${nowDate}.json`));
        readFile = JSON.parse(readFile);
        readFile.push(newLog);
        fs.writeFileSync(path.join(process.cwd(), `/log/_psql/${nowDate}.json`), JSON.stringify(readFile));
    } catch (error) {
        internalErrorCatcher(error);
    }
}

module.exports = {
    logPsqlWriter,
};

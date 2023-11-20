const { loggerCron } = require('../logger/logger.config');

function runConfigCronJobs() {
    loggerCron();
}

module.exports = {
    runConfigCronJobs,
};

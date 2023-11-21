const { logFolderCreator, logFileCreator } = require('../logger/logger.config');

async function defaultFilesCreater() {
    logFolderCreator();
    logFileCreator();
}

module.exports = {
    defaultFilesCreater,
};

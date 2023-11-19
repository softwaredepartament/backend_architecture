const { logFolderCreator, logFileCreator } = require("../logger/logger.config");
const { internalErrorCatcher } = require("../logger/logger.internal");

async function defaultFilesCreater() {
    logFolderCreator()
    logFileCreator()
}

module.exports = {
    defaultFilesCreater
}
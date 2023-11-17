const { logFileCreater } = require("./logger");

function defaultFilesCreater() {
    logFileCreater()
}

module.exports = {
    defaultFilesCreater
}
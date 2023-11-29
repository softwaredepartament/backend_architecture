const { getCurrentDateFormatted } = require('./../lib/helper');
const cron = require('node-cron');
const path = require('path');
const fs = require('fs');

function logFolderCreator() {
    const checkLogFolderIsExists = fs.existsSync(path.join(process.cwd(), `/log/`));
    if (!checkLogFolderIsExists) {
        fs.mkdirSync(path.join(process.cwd(), `/log/`));
    }

    const check_internalErrorFolderIsExists = fs.existsSync(path.join(process.cwd(), `/log/_internalError`));
    if (!check_internalErrorFolderIsExists) {
        fs.mkdirSync(path.join(process.cwd(), `/log/_internalError`));
    }

    const check_notFoundFolderIsExists = fs.existsSync(path.join(process.cwd(), `/log/_notFound`));
    if (!check_notFoundFolderIsExists) {
        fs.mkdirSync(path.join(process.cwd(), `/log/_notFound`));
    }

    const check_psqlFolderIsExists = fs.existsSync(path.join(process.cwd(), `/log/_psql`));
    if (!check_psqlFolderIsExists) {
        fs.mkdirSync(path.join(process.cwd(), `/log/_psql`));
    }

    const checkModulesFolderIsExists = fs.readdirSync(path.join(process.cwd(), '/src/module'));
    for (const module of checkModulesFolderIsExists) {
        const checkModuleFolderIsExists = fs.existsSync(path.join(process.cwd(), `/log/` + module));
        if (!checkModuleFolderIsExists) {
            fs.mkdirSync(path.join(process.cwd(), `/log/` + module));
        }
    }

    const logFolders = fs.readdirSync(path.join(process.cwd(), '/log'));
    for (const logFolder of logFolders) {
        const checkIfFolderExistsError = fs.existsSync(path.join(process.cwd(), `/log/${logFolder}/error/`));
        const checkIfFolderExistsSuccess = fs.existsSync(path.join(process.cwd(), `/log/${logFolder}/success/`));

        let checkIsConfigFolder = path.join(process.cwd(), `/log/${logFolder}`).split('\\');
        checkIsConfigFolder = checkIsConfigFolder[checkIsConfigFolder.length - 1];

        if (!checkIfFolderExistsError && checkIsConfigFolder[0] != '_') {
            fs.mkdirSync(path.join(process.cwd(), `/log/${logFolder}/error/`));
        }

        if (!checkIfFolderExistsSuccess && checkIsConfigFolder[0] != '_') {
            fs.mkdirSync(path.join(process.cwd(), `/log/${logFolder}/success/`));
        }
    }
}

function logFileCreator() {
    const nowDate = getCurrentDateFormatted();

    const logModule = fs.readdirSync(path.join(process.cwd(), '/log'));
    for (const module of logModule) {
        // const checkIfFolderExistsFiles = fs.existsSync(path.join(process.cwd(), `/log/${module}/files/`));

        // if (!checkIfFolderExistsFiles && checkIsConfigFolder[0] != '_') {
        //     fs.mkdirSync(path.join(process.cwd(), `/log/${module}/files/`));
        // }

        let checkIsConfigFolder = path.join(process.cwd(), `/log/${module}`).split('\\');
        checkIsConfigFolder = checkIsConfigFolder[checkIsConfigFolder.length - 1];

        const checkIfFileExistsError = fs.existsSync(path.join(process.cwd(), `/log/${module}/error/${nowDate}.json`));
        const checkIfFileExistsSuccess = fs.existsSync(path.join(process.cwd(), `/log/${module}/success/${nowDate}.json`));

        if (module == '_notFound') {
            const checkIfFileExistsNotFound = fs.existsSync(path.join(process.cwd(), `/log/${module}/${nowDate}.json`));
            if (!checkIfFileExistsNotFound) {
                fs.writeFileSync(path.join(process.cwd(), `/log/${module}/${nowDate}.json`), JSON.stringify([]));
            }
        }

        if (module == '_psql') {
            const checkIfFileExistsNotFound = fs.existsSync(path.join(process.cwd(), `/log/${module}/${nowDate}.json`));
            if (!checkIfFileExistsNotFound) {
                fs.writeFileSync(path.join(process.cwd(), `/log/${module}/${nowDate}.json`), JSON.stringify([]));
            }
        }

        if (!checkIfFileExistsError && checkIsConfigFolder[0] != '_') {
            fs.writeFileSync(path.join(process.cwd(), `/log/${module}/error/${nowDate}.json`), JSON.stringify([]));
        }
        if (!checkIfFileExistsSuccess && checkIsConfigFolder[0] != '_') {
            fs.writeFileSync(path.join(process.cwd(), `/log/${module}/success/${nowDate}.json`), JSON.stringify([]));
        }
    }
}

function loggerCron() {
    cron.schedule('0 0 0 * * *', () => {
        logFileCreator();
    });
}

module.exports = {
    logFolderCreator,
    logFileCreator,
    loggerCron,
};

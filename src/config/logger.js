const { getCurrentDateFormatted } = require('../lib/helpers');
const cron = require('node-cron')
const path = require('path')
const fs = require('fs');

function logFileCreater() {
    const nowDate = getCurrentDateFormatted()
    
    const logModule = fs.readdirSync(path.join(process.cwd(), '/log'))
    for (const module of logModule) {
        const checkIfFolderExistsError = fs.existsSync(path.join(process.cwd(), `/log/${module}/error/`))
        const checkIfFolderExistsFiles = fs.existsSync(path.join(process.cwd(), `/log/${module}/files/`))
        const checkIfFolderExistsSuccess = fs.existsSync(path.join(process.cwd(), `/log/${module}/success/`))
        
        if (!checkIfFolderExistsError) {
            fs.mkdirSync(path.join(process.cwd(), `/log/${module}/error/`))
        }

        let checkIsConfigFolder = path.join(process.cwd(), `/log/${module}`).split('\\')
        checkIsConfigFolder = checkIsConfigFolder[checkIsConfigFolder.length - 1]
        if (!checkIfFolderExistsFiles && checkIsConfigFolder[0] != '_') {
            fs.mkdirSync(path.join(process.cwd(), `/log/${module}/files/`))
        }

        if (!checkIfFolderExistsSuccess && checkIsConfigFolder[0] != '_') {
            fs.mkdirSync(path.join(process.cwd(), `/log/${module}/success/`))
        }
        

        const checkIfFileExistsError = fs.existsSync(path.join(process.cwd(), `/log/${module}/error/${nowDate}.txt`))
        const checkIfFileExistsSuccess = fs.existsSync(path.join(process.cwd(), `/log/${module}/success/${nowDate}.txt`))
        
        if (!checkIfFileExistsError && checkIsConfigFolder[0] != '_') {
            fs.writeFileSync(path.join(process.cwd(), `/log/${module}/error/${nowDate}.txt`), '')
        }
        if (!checkIfFileExistsSuccess && checkIsConfigFolder[0] != '_') {
            fs.writeFileSync(path.join(process.cwd(), `/log/${module}/success/${nowDate}.txt`), '')
        }
    }
}

function loggerCron() {
    cron.schedule('0 0 0 * * *', () => {
        logFileCreater()
    })
}
logFileCreater()


module.exports = {
    logFileCreater,
    loggerCron
}
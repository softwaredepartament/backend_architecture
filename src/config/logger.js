const { getCurrentDateFormatted } = require('../lib/helpers');
const cron = require('node-cron')
const path = require('path')
const fs = require('fs');

function logFileCreater() {
    const nowDate = getCurrentDateFormatted()
    
    const logModule = fs.readdirSync(path.join(process.cwd(), '/log'))
    for (const module of logModule) {
        const checkIfFolderExistsFiles = fs.existsSync(path.join(process.cwd(), `/log/${module}/files/`))
        const checkIfFolderExistsError = fs.existsSync(path.join(process.cwd(), `/log/${module}/error/`))
        const checkIfFolderExistsSuccess = fs.existsSync(path.join(process.cwd(), `/log/${module}/success/`))
        
        if (!checkIfFolderExistsFiles) {
            fs.mkdirSync(path.join(process.cwd(), `/log/${module}/files/`))
        }
        
        if (!checkIfFolderExistsError) {
            fs.mkdirSync(path.join(process.cwd(), `/log/${module}/error/`))
        }

        if (!checkIfFolderExistsSuccess) {
            fs.mkdirSync(path.join(process.cwd(), `/log/${module}/success/`))
        }
        

        const checkIfFileExistsError = fs.existsSync(path.join(process.cwd(), `/log/${module}/error/${nowDate}.txt`))
        const checkIfFileExistsSuccess = fs.existsSync(path.join(process.cwd(), `/log/${module}/success/${nowDate}.txt`))
        
        if (!checkIfFileExistsError) {
            fs.writeFileSync(path.join(process.cwd(), `/log/${module}/error/${nowDate}.txt`), '')
        }
        if (!checkIfFileExistsSuccess) {
            fs.writeFileSync(path.join(process.cwd(), `/log/${module}/success/${nowDate}.txt`), '')
        }
    }
}

function loggerCron() {
    cron.schedule('0 0 0 * * *', () => {
        logFileCreater()
    })
}


module.exports = {
    logFileCreater,
    loggerCron
}
const cron = require('node-cron')
const path = require('path')
const fs = require('fs')

function logFileCreater() {
    const logModule = fs.readdirSync(path.join(process.cwd(), '../log'))
    for (const module of logModule) {
        console.log(module);
    }
    const checkIfFileExists = fs.existsSync(path.join(process.cwd(), '../log/'))
}

function loggerCron() {
    cron.schedule('0 0 0 * * *', () => {
        
    })
}
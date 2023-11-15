const { HttpException, errors } = require("../lib/httpException");
const { getCurrentDateFormatted } = require("../lib/helpers");
const path = require('path')
const fs = require('fs');

function logger (isFileRequired = false) {
    return (req, res, next) => {
        try {
            const nowDate = getCurrentDateFormatted()
            
            const logModule = fs.readdirSync(path.join(process.cwd(), '/src/module'))
            const findModuleByReq = logModule.find(el => el == req.originalUrl.split('/')[2])
            if (!findModuleByReq) {
                
            }
        } catch (error) {
            new HttpException(500, `Syntax error ${error}`, errors.INTERNAL_SERVER_ERROR)
            return res.status(500).json({
                status: 500,
                message: `Syntax error`,
                error: errors.INTERNAL_SERVER_ERROR
            })
        }
    }
}

module.exports = {
    logger
}
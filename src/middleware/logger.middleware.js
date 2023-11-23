const { internalErrorCatcher } = require('../shared/logger/logger.internal');
const { logNotFoundWriter } = require('../shared/logger/logger.notfound');
const { logWriter } = require('../shared/logger/logger.request');
const { errors } = require('../lib/httpException');
const path = require('path');
const fs = require('fs');

function logger(req, res, next) {
    try {
        const logModule = fs.readdirSync(path.join(process.cwd(), '/src/module'));
        const findModuleByReq = logModule.find(el => el == req.originalUrl.split('/')[2]);
        if (!findModuleByReq) {
            const originalEnd = res.end;

            res.end = function (chunk, encoding) {
                try {
                    if (chunk) {
                        logNotFoundWriter(
                            '_notFound',
                            res.statusCode ? res.statusCode : 500,
                            req.hostname,
                            req.method,
                            req.url,
                            req.headers['user-agent'],
                            {
                                body: req.body,
                                params: req.params,
                                query: req.query,
                            },
                            /^\s*\{.*\}\s*$/.test(chunk) ? JSON.parse(chunk) : chunk,
                        );
                    }
                    originalEnd.apply(res, arguments);
                } catch (error) {
                    internalErrorCatcher(error);
                    return res.status(500).json({
                        status: 500,
                        message: `Syntax error`,
                        error: errors.INTERNAL_SERVER_ERROR,
                    });
                }
            };
            next();
        } else {
            // const originalSendFile = res.sendFile;
            // res.sendFile = function (path, options, callback) {
            //     try {
            //         logWriter(
            //             findModuleByReq,
            //             res.statusCode ? res.statusCode : 500,
            //             req.hostname,
            //             req.method,
            //             req.url,
            //             req.headers['user-agent'],
            //             req.body,
            //             path,
            //         );
            //         originalSendFile.call(this, path, options, callback);
            //     } catch (error) {
            //         new HttpException(500, `Syntax error ${error}`, errors.INTERNAL_SERVER_ERROR, 'logger');
            //         return res.status(500).json({
            //             status: 500,
            //             message: `Syntax error`,
            //             error: errors.INTERNAL_SERVER_ERROR,
            //         });
            //     }
            // };

            const originalEnd = res.end;
            res.end = function (chunk, encoding) {
                try {
                    if (chunk) {
                        logWriter(
                            findModuleByReq,
                            res.statusCode ? res.statusCode : 500,
                            req.hostname,
                            req.method,
                            req.url,
                            req.headers['user-agent'],
                            {
                                body: req.body,
                                params: req.params,
                                query: req.query,
                            },
                            /^\s*\{.*\}\s*$/.test(chunk) ? JSON.parse(chunk) : chunk,
                        );
                    }
                    originalEnd.apply(res, arguments);
                } catch (error) {
                    internalErrorCatcher(error);
                    return res.status(500).json({
                        status: 500,
                        message: `Syntax error`,
                        error: errors.INTERNAL_SERVER_ERROR,
                    });
                }
            };
            next();
        }
    } catch (error) {
        internalErrorCatcher(error);
        return res.status(500).json({
            status: 500,
            message: `Syntax error`,
            error: errors.INTERNAL_SERVER_ERROR,
        });
    }
}

module.exports = {
    logger,
};

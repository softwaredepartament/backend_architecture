// const { HttpException, errors } = require('../lib/httpException');
// const { getCurrentDateFormatted } = require('../lib/helpers');
// const { logWriter } = require('../shared/logger.shared');
// const path = require('path');
// const fs = require('fs');

// function logger(isFileRequired = false) {
//     return async (req, res, next) => {
//         try {
//             const logModule = fs.readdirSync(path.join(process.cwd(), '/src/module'));
//             const findModuleByReq = logModule.find(el => el == req.originalUrl.split('/')[2]);
//             if (!findModuleByReq) {
//                 const originalEnd = res.end;
//                 const originalSendFile = res.sendFile;

//                 res.end = function (chunk, encoding) {
//                     try {
//                         if (chunk) {
//                             logWriter(
//                                 '_notfound',
//                                 res.statusCode ? res.statusCode : 500,
//                                 req.hostname,
//                                 req.method,
//                                 req.url,
//                                 req.headers['user-agent'],
//                                 req.body,
//                                 /^\s*\{.*\}\s*$/.test(chunk) ? JSON.parse(chunk) : chunk,
//                             );
//                         }
//                         originalEnd.apply(res, arguments);
//                     } catch (error) {
//                         new HttpException(500, `Syntax error ${error}`, errors.INTERNAL_SERVER_ERROR, logger);
//                         return res.status(500).json({
//                             status: 500,
//                             message: `Syntax error`,
//                             error: errors.INTERNAL_SERVER_ERROR,
//                         });
//                     }
//                 };
//                 res.sendFile = function (path, options, callback) {
//                     try {
//                         logWriter(
//                             '_notfound',
//                             res.statusCode ? res.statusCode : 500,
//                             req.hostname,
//                             req.method,
//                             req.url,
//                             req.headers['user-agent'],
//                             req.body,
//                             path,
//                         );
//                         originalSendFile.call(this, path, options, callback);
//                     } catch (error) {
//                         new HttpException(500, `Syntax error ${error}`, errors.INTERNAL_SERVER_ERROR, 'logger');
//                         return res.status(500).json({
//                             status: 500,
//                             message: `Syntax error`,
//                             error: errors.INTERNAL_SERVER_ERROR,
//                         });
//                     }
//                 };
//             } else {
//                 console.log(findModuleByReq);
//                 const originalEnd = res.end;
//                 const originalSendFile = res.sendFile;

//                 res.end = function (chunk, encoding) {
//                     try {
//                         if (chunk) {
//                             logWriter(
//                                 findModuleByReq,
//                                 res.statusCode ? res.statusCode : 500,
//                                 req.hostname,
//                                 req.method,
//                                 req.url,
//                                 req.headers['user-agent'],
//                                 req.body,
//                                 /^\s*\{.*\}\s*$/.test(chunk) ? JSON.parse(chunk) : chunk,
//                             );
//                         }
//                         originalEnd.apply(res, arguments);
//                     } catch (error) {
//                         console.log(error);
//                         new HttpException(500, `Syntax error ${error}`, errors.INTERNAL_SERVER_ERROR, 'logger');
//                         return res.status(500).json({
//                             status: 500,
//                             message: `Syntax error`,
//                             error: errors.INTERNAL_SERVER_ERROR,
//                         });
//                     }
//                 };
//                 res.sendFile = function (path, options, callback) {
//                     try {
//                         logWriter(
//                             findModuleByReq,
//                             res.statusCode ? res.statusCode : 500,
//                             req.hostname,
//                             req.method,
//                             req.url,
//                             req.headers['user-agent'],
//                             req.body,
//                             path,
//                         );
//                         originalSendFile.call(this, path, options, callback);
//                     } catch (error) {
//                         new HttpException(500, `Syntax error ${error}`, errors.INTERNAL_SERVER_ERROR, 'logger');
//                         return res.status(500).json({
//                             status: 500,
//                             message: `Syntax error`,
//                             error: errors.INTERNAL_SERVER_ERROR,
//                         });
//                     }
//                 };
//             }
//             next();
//         } catch (error) {
//             new HttpException(500, `Syntax error ${error}`, errors.INTERNAL_SERVER_ERROR, 'logger');
//             return res.status(500).json({
//                 status: 500,
//                 message: `Syntax error`,
//                 error: errors.INTERNAL_SERVER_ERROR,
//             });
//         }
//     };
// }

// module.exports = {
//     logger,
// };

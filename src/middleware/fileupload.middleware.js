const { internalErrorCatcher } = require('../shared/logger/logger.internal');
const path = require('path');
const fs = require('fs');
const { returnResponse } = require('../lib/express.function');
const { errors } = require('../lib/httpException');

function fileuploadMiddleware(reqFileKeyName, allowedFileTypes, allowedFileSize) {
    try {
        return (req, res, next) => {
            const checkFileExists = req.files[reqFileKeyName];
            if (!checkFileExists) {
                return returnResponse(res, 403, `Expected name ${reqFileKeyName}`, errors.UPLOAD_ERROR);
            }

            const checkFileType = allowedFileTypes.find(type => type === checkFileExists.mimetype);
            if (!checkFileType) {
                return returnResponse(res, 403, `Expected type ${allowedFileTypes.join(' — ')}`, errors.UPLOAD_ERROR);
            }

            const checkFileSize = allowedFileSize * 1024 * 1024 > checkFileExists.size;
            console.log(checkFileSize);
            if (!checkFileSize) {
                return returnResponse(res, 403, `Max size ${allowedFileSize} MB`, errors.UPLOAD_ERROR);
            }

            next();
        };
    } catch (error) {
        internalErrorCatcher(error);
    }
}

module.exports = {
    fileuploadMiddleware,
};

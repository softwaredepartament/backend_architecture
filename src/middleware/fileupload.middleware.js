const { internalErrorCatcher } = require('../shared/logger/logger.internal');
const { returnResponse } = require('../lib/express.function');
const { errors } = require('../lib/httpException');

function fileuploadMiddleware(reqFileKeyName, allowedFileTypes, allowedFileSize, isRequired = true) {
    try {
        return (req, res, next) => {
            if (typeof reqFileKeyName == 'object') {
                for (const requiredFile of reqFileKeyName) {
                    const findFile = req.files ? Object.keys(req.files).find(file => file === requiredFile) : false;

                    if (!isRequired ? findFile : false || isRequired) {
                        if (!findFile) {
                            return returnResponse(res, 403, `Expected name ${requiredFile}`, errors.UPLOAD_ERROR);
                        }

                        const checkFileType = allowedFileTypes.find(type => type === req.files[findFile].mimetype);
                        if (!checkFileType) {
                            return returnResponse(res, 403, `Expected type ${allowedFileTypes.join(' — ')}`, errors.UPLOAD_ERROR);
                        }

                        const checkFileSize = allowedFileSize * 1024 * 1024 > req.files[findFile].size;
                        if (!checkFileSize) {
                            return returnResponse(res, 403, `Max size ${allowedFileSize} MB`, errors.UPLOAD_ERROR);
                        }
                    }
                }
            } else {
                if (!isRequired ? (req.files ? req.files[reqFileKeyName] : false) : false || isRequired) {
                    const checkFileExists = req.files ? req.files[reqFileKeyName] : false;
                    if (!checkFileExists) {
                        return returnResponse(res, 403, `Expected name ${reqFileKeyName}`, errors.UPLOAD_ERROR);
                    }

                    const checkFileType = allowedFileTypes.find(type => type === checkFileExists.mimetype);
                    if (!checkFileType) {
                        return returnResponse(res, 403, `Expected type ${allowedFileTypes.join(' — ')}`, errors.UPLOAD_ERROR);
                    }

                    const checkFileSize = allowedFileSize * 1024 * 1024 > checkFileExists.size;
                    if (!checkFileSize) {
                        return returnResponse(res, 403, `Max size ${allowedFileSize} MB`, errors.UPLOAD_ERROR);
                    }
                }
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

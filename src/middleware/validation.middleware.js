const { internalErrorCatcher } = require('../shared/logger/logger.internal');
const { validator } = require('../shared/validation/validation');
const { returnResponse } = require('../lib/express.function');
const { errors } = require('../lib/httpException');

function validationMiddleware(dto, value) {
    try {
        return (req, res, next) => {
            const validatorResponse = validator(dto, req[value]);
            if (validatorResponse.status == 200) {
                next();
            } else {
                return returnResponse(res, 403, validatorResponse.error, errors.VALIDATION_ERROR);
            }
        };
    } catch (error) {
        internalErrorCatcher(error);
    }
}

module.exports = validationMiddleware;

const { internalErrorCatcher } = require("../shared/logger/logger.internal");
const { validator } = require("../shared/validation/validation");

function validationMiddleware(dto, value) {
    try {
        return (req, res, next) => {
            const validatorResponse = validator(dto, req[value])
            if (validatorResponse.status == 200) {
                next()
            } else {
                return res.status(403).json({status: 403, message: validatorResponse.error, error: 'VALIDATION_ERROR'})
            }
        }
    } catch (error) {
        internalErrorCatcher(error)
    }
}

module.exports = validationMiddleware
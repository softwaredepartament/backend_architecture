const { httpExceptionLogWriter } = require("../shared/logger.shared");

const errors = {
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
    INVALID_TOKEN: 'INVALID_TOKEN',
    TOKEN_EXPIRED: 'TOKEN_EXPIRED',
    TOKEN_REVOKED: 'TOKEN_REVOKED',
    FORBIDDEN_ERROR: 'FORBIDDEN_ERROR',
    UNAUTHORIZED: 'UNAUTHORIZED',
};

class HttpException {
    constructor(status, message, error, functionName) {
        this.status = status;
        this.message = message || '';
        this.error = error;
        this.functionName = functionName;

        httpExceptionLogWriter('httpExceptionLogWriter', functionName, status, message, error)
    }
}

module.exports = {
    errors,
    HttpException,
};

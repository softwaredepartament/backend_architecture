const errors = {
    INTERNAL_ERROR: 'INTERNAL_ERROR',
    INVALID_TOKEN: 'INVALID_TOKEN',
    TOKEN_EXPIRED: 'TOKEN_EXPIRED',
    TOKEN_REVOKED: 'TOKEN_REVOKED',
    FORBIDDEN_ERROR: 'FORBIDDEN_ERROR',
    UNAUTHORIZED: 'UNAUTHORIZED'
}

class HttpException{
    constructor(status, message, error) {
        this.status = status;
        this.message = message || '';
        this.error = error;
    }
}

module.exports = {
    errors,
    HttpException,
}
const { requestJwtToken, verifyJwtToken } = require('../../lib/jwt');
const { HttpException, errors } = require('./../../lib/httpException');

async function usersModel(params) {
    if (params.id == 1) {
        throw new HttpException(400, errors.INVALID_TOKEN, 'TOKEN HATOOO!', params);
    }
    
    return requestJwtToken(params.id);
}

module.exports = {
    usersModel,
};

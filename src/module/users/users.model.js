const { HttpException, errors } = require('./../../lib/httpException');
const { requestJwtToken } = require('../../lib/jwt');

async function usersModel(params) {
    if (params.id == 1) {
        throw new HttpException(400, errors.INVALID_TOKEN, 'TOKEN HATOOO!', params);
    }

    return requestJwtToken(params.id);
}

module.exports = {
    usersModel,
};

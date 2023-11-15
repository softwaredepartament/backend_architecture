const { HttpException, errors } = require('./../../lib/httpException')

async function usersModel(params) {
    if (params.id == 1) {
        throw new HttpException(404, errors.INVALID_TOKEN, 'Filsdasdasdial topilmadi!');
    }

    return 200
}

module.exports = {
    usersModel
}
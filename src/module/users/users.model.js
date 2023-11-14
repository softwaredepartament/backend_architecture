const HttpException = require('./../../lib/httpException')

async function usersModel(params) {
    if (params.id == 1) {
        throw new HttpException(404, "BRANCH_NOT_FOUND", 'Filsdasdasdial topilmadi!');
    }

    return 200
}

module.exports = {
    usersModel
}
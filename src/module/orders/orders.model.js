const { HttpException, errors } = require('./../../lib/httpException')

async function ordersModel(params) {
    if (params.id > 500) {
        throw new HttpException(400, errors.FORBIDDEN_ERROR, 'orderda muammo bor!');
    }

    return 200
}

module.exports = {
    ordersModel
}
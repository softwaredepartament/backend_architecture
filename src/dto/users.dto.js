const createUsersDto = {
    user_first_name: {
        required: true,
        max: 32,
        min: 10,
        isUuid: true,

    }
}

const getUsersDto = {
    id: {
        required: true,
        min: 1,
        max: 30,
        type: 'number'
    }
}

module.exports = {
    getUsersDto
}
const createUsersDto = {
    user_first_name: {
        required: true,
        max: 32,
        min: 10,
        isUuid: true,

    }
}
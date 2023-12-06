const getUsersDto = {
    id: {
        required: true,
        min: 1,
        max: 30,
        type: 'number',
    },
};

module.exports = {
    getUsersDto,
};

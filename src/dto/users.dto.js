const getUsersDto = {
    id: {
        required: true,
        min: 1,
        max: 30,
        type: 'number',
        custom_validation: [1 === 2 ? true : false, 'pinfl da muammo bor 12351231285129 shunaq'],
    },
};

module.exports = {
    getUsersDto,
};

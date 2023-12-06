const { USER_PROFILE_IMG_NAME, USER_PROFILE_IMG_TYPES, USER_PROFILE_IMG_SIZE } = require('./users.config');
const { fileuploadMiddleware } = require('../../middleware/fileupload.middleware');
const validationMiddleware = require('../../middleware/validation.middleware');
const { getUsersDto } = require('../../dto/users.dto');
const { usersCtrl } = require('./users.ctrl');

const express = require('express').Router();

express.post(
    '/api/users/:id',
    fileuploadMiddleware(USER_PROFILE_IMG_NAME, USER_PROFILE_IMG_TYPES, USER_PROFILE_IMG_SIZE),
    validationMiddleware(getUsersDto, 'params'),
    (req, res) => usersCtrl(req, res),
);

module.exports = express;

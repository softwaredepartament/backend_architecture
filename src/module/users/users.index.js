const validationMiddleware = require('../../middleware/validation.middleware');
const { getUsersDto } = require('../../dto/users.dto');
const { usersCtrl } = require('./users.ctrl');

const express = require('express').Router();

express.get('/api/users/:id', validationMiddleware(getUsersDto, 'params'), (req, res) => usersCtrl(req, res));

module.exports = express;

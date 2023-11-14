const { usersCtrl } = require('./users.ctrl')

const express = require('express').Router()

express.get('/users/:id', (req, res) => usersCtrl(req, res))

module.exports = express
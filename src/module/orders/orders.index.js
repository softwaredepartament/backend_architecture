const { orderCtrl } = require('./orders.ctrl');

const express = require('express').Router();

express.get('/api/orders/:id', (req, res) => orderCtrl(req, res));

module.exports = express;

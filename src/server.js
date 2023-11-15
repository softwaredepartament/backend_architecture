const app = require('./app');

const users = require('./module/users/users.index')
const orders = require('./module/orders/orders.index')

app([users, orders]);

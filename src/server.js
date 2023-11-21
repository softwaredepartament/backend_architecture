const app = require('./app');

const orders = require('./module/orders/orders.index');
const users = require('./module/users/users.index');

app([users, orders]);

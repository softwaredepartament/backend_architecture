const path = require('path');
const { orderModel } = require('./orders.model.js');

async function orderCtrl(req, res) {
    try {
        const model = await orderModel(req.params);

        // return res.status(404).sendFile(path.join(process.cwd(), `/log/users/error/14.11.2023.txt`))

        return res.status(200).send({
            status: 200,
            message: 'ishladi',
            data: 'hozircha data yoooooqq',
        });
    } catch (error) {
        return res.status(error.status).json(error);
    }
}

module.exports = {
    orderCtrl,
};

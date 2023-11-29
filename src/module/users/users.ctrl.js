const path = require('path');
const { usersModel } = require('./users.model');

async function usersCtrl(req, res) {
    try {
        const model = await usersModel(req.params);

        // return res.status(404).sendFile(path.join(process.cwd(), `/log/users/error/14.11.2023.txt`))

        return res.status(200).send({
            status: 200,
            message: 'ishladi',
            data: model,
        });
    } catch (error) {
        return res.status(error.status).json(error);
    }
}

module.exports = {
    usersCtrl,
};

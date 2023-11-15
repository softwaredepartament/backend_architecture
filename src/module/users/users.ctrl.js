const { usersModel } = require("./users.model");

async function usersCtrl(req, res) {
    try {
        const model = await usersModel(req.params)

        return res.json(model)
    } catch (error) {
        return res.status(error.status).json(error)
    }
}



module.exports = {
    usersCtrl
}
const ApiError = require('../errors/apiError');


class UserController {
    async register(req, res) {

    }

    async login(req, res) {

    }

    async isAuthorized(req, res, next) {
        //res.json("LOlalolLil");

        const {id} = req.query;

        if (!id) {
            return next(ApiError.badRequest("No id"));
        }

        res.json(id);

      //  throw {message: "invalid id"};
    }
}

module.exports = new UserController();
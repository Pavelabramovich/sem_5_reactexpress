const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const {User} = require('../models/models')
const ApiError = require('../errors/apiError');


function generateJwt(id, login, roleId) {
    return jsonwebtoken.sign(
        {id, login, roleId}, 
        process.env.SECRET_KEY, 
        {expiresIn: '24h'}
    );
};


class UserController {
    async register(req, res, next) {
        const {login, password, roleId} = req.body;

        roleId ??= 1;

        if (!email || !password) {
            next(ApiError.badRequest("Incorrect login or password"));
        }

        const candidate = await User.findOne({where:{login}});
        if (candidate) {
            next(ApiError.badRequest("User with this login already exists"));
        }

        const hashedPassword = await bcrypt.hash(password, 5);
        const user = await User.create({login, roleId, password: hashedPassword});
        const token = generateJwt(user.id, login, roleId);

        return res.json({token})
    }

    async login(req, res, next) {
        const {login, password} = req.body;

        const user = await User.findOne({where: {login}});

        if (!user) {
            return next(ApiError.badRequest("User with this email does not exist"));
        }

        const comparePasswords = bcrypt.compareSync(password, user.password);
        if (!comparePasswords) {
            return next(ApiError.badRequest("Incorrect password"));
        }

        const token = generateJwt(user.id, login, password);

        return res.json({token});
    }

    async isAuthorized(req, res, next) {
        const {id, login, roleId} = req.body;

        if (!email || !password || !roleId) {
            next(ApiError.badRequest("Incorrect login or password or role id"));
        }

        const token = generateJwt(id, login, roleId);
        res.json({token});
    }
}

module.exports = new UserController();
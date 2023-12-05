const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const ApiError = require('../errors/apiError');

const UserRepository = require('../repositories/UserRepository');


function generateJwt(id, login, roleId) {
    return jsonwebtoken.sign(
        {id, login, roleId}, 
        process.env.SECRET_KEY, 
        {expiresIn: '24h'}
    );
};


class UserController {
    async register(req, res, next) {
        const {login, password} = req.body;
        const fields = {login, password};
        
        for (let field in fields) {
            if (!fields[field]) {  
                return next(ApiError.badRequest(JSON.stringify({field: fields[field], text: `${field} is empty`})));
            }
        }
        
        const userWithSameLogin = await UserRepository.getByLogin(login);

        if (userWithSameLogin) {
            return next(ApiError.badRequest(JSON.stringify({field: 'login', text: "User with same login already exists."})));
        }
        
        const hashedPassword = await bcrypt.hash(password, 5);

        try {
            const user = await UserRepository.create({login, password: hashedPassword, roleId: 1}, { validate: true });
            const token = generateJwt(user.id, login, 1);

            return res.json({token})
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }

    async login(req, res, next) {
        const {login, password} = req.body;

        const user = await UserRepository.getByLogin(login);

        if (!user) {
            return next(ApiError.badRequest(JSON.stringify({field: 'login', text: "User with this login does not exist"})));
        }

        const comparePasswords = bcrypt.compareSync(password, user.password);
        if (!comparePasswords) {
            return next(ApiError.badRequest(JSON.stringify({field: 'password', text: "Incorrect password"})));
        }

        const token = generateJwt(user.id, login, user.roleId);

        return res.json({token});
    }

    async isAuthorized(req, res, next) {
        const {id, login, roleId} = req.body;

        if (!id || !login || !roleId) {
            return next(ApiError.badRequest("Incorrect id or login or role id"));
        }

        const token = generateJwt(id, login, roleId);
        res.json({token});
    }
}

module.exports = new UserController();
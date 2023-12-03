const {Role} = require('../models/models')
const ApiError = require('../errors/apiError');


class RoleController {
    async create(req, res, next) {
        const {name} = req.body;

        const roleWithSameName = await Role.findOne({where:{name}});

        if (roleWithSameName) {
            return next(ApiError.badRequest("Role with same name already exists."));
        }

        const role = await Role.create({name});

        return res.json(role);
    }

    async getAll(req, res) {
        const roles = await Role.findAll();

        return res.json(roles);
    }
}

module.exports = new RoleController();
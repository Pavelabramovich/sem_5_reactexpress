const {Role} = require('../models/models')
const ApiError = require('../errors/apiError');

const RoleRepository = require('../repositories/RoleRepository');


class RoleController {
    async create(req, res, next) {
        const {name} = req.body;

        const roleWithSameName = await RoleRepository.getByName(name);

        if (roleWithSameName) {
            return next(ApiError.badRequest("Role with same name already exists."));
        }

        const role = await RoleRepository.create({name});

        return res.json(role);
    }

    async getAll(req, res) {
        const roles = await RoleRepository.getAll();

        return res.json(roles);
    }
}

module.exports = new RoleController();
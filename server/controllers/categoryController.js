const {Category} = require('../models/models')
const ApiError = require('../errors/apiError');


class CategoryController {
    async create(req, res, next) {
        const {name} = req.body;

        const categoryWithSameName = await Category.findOne({where:{name}});

        if (categoryWithSameName) {
            return next(ApiError.badRequest("Category with same name already exists."));
        }

        const category = await Category.create({name});

        return res.json(category);
    }

    async getAll(req, res) {
        const categories = await Category.findAll();
        return res.json(categories);
    }
}

module.exports = new CategoryController();
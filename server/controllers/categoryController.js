const {Category} = require('../models/models')
const ApiError = require('../errors/apiError');


const CategoryRepository = require('../repositories/CategoryRepository');


class CategoryController {
    async create(req, res, next) {
        const {name} = req.body;

        const categoryWithSameName = await CategoryRepository.getByName(name);

        if (categoryWithSameName) {
            return next(ApiError.badRequest("Category with same name already exists."));
        }

        const category = await CategoryRepository.create({name});

        return res.json(category);
    }

    async getAll(req, res) {
        const categories = await CategoryRepository.getAll();
        return res.json(categories);
    }
}

module.exports = new CategoryController();
const ApiError = require('../errors/apiError');

const AuthorRepository = require('../repositories/AuthorRepository');


class AuthorController {
    async create(req, res, next) {
        const {name} = req.body;

        const authorWithSameName = await AuthorRepository.getByName(name);

        if (authorWithSameName) {
            return next(ApiError.badRequest("Author with same name already exists."));
        }

        const author = await AuthorRepository.create({name});

        return res.json(author);
    }

    async getAll(req, res) {
        const categories = await AuthorRepository.getAll();
        return res.json(categories);
    }
}

module.exports = new AuthorController();
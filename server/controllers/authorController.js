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
        const authors = await AuthorRepository.getAll();
        return res.json(authors);
    }

    async update(req, res, next) {
        try {
            const {id} = req.params;
            const {name} = req.body;

            console.log(id + "ghgfghgfgfdfffffffff"+name)

            const author = await AuthorRepository.update(id, name);
      
            return res.json(author);
            
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params;
            
            const result = await AuthorRepository.delete(id);
        
            res.status(204).json();
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new AuthorController();
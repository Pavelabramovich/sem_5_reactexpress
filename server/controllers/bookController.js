const uuid = require('uuid');
const path = require('path');


const ApiError = require('../errors/apiError');

const pool = require('../db');

const BookRepository = require('../repositories/BookRepository');


class BookController {
    async create(req, res, next) {
        try {
            const {title, price, authorId} = req.body;

            let fname;

            try {
                if (req.files === null) {
                    fname = "image_default.png";
                } else {
                    const {image} = req.files;

                    const filename = uuid.v4() + '.jpg';
                    image.mv(path.resolve(__dirname, '..', 'static', filename));
    
                    fname = filename;
                }
            } catch (error) {
                fname = "image_default.png";
            }

            const bookWithSameTitle = await BookRepository.getByTitle(title);

            if (bookWithSameTitle) {
                return next(ApiError.badRequest(JSON.stringify({field: 'title', text: "Book with same title already exists."})));
            }

            const book = await BookRepository.create({title, price, authorId, image: fname});

            return res.json(book);
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        let {authorId} = req.query;

        let books = await BookRepository.getAll(authorId);
        books = {rows: books};

        return res.json(books);
    }

    async getById(req, res) {
        const {id} = req.params;
 
        const books = await BookRepository.getById(id);
        return res.json(books)
    }

    async update(req, res, next) {
        try {
            const {id} = req.params;
            const newBook = {...req.body};

            try {
                if (req.files === null) {
                    
                } else {
                    const {image} = req.files;

                    const filename = uuid.v4() + '.jpg';
                    image.mv(path.resolve(__dirname, '..', 'static', filename));
    
                    newBook.image = filename;
                }
            } catch (error) {
                
            }
            
            const book = await BookRepository.update(id, newBook);

            return res.json(book);
            
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    };

    async updateCategories(req, res, next) {
        try {
            const {id} = req.params;
            const {categoriesId} = req.body;

            const newCategories = await BookRepository.updateCategories(id, categoriesId);
            return res.json(newCategories);
            
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }

    async getCategories(req, res, next) {
        try {
            const {id} = req.params;
            
            const categories = await BookRepository.getCategories(id);
            return res.json(categories);
            
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params;
            
            const result = await BookRepository.delete(id);
        
            res.status(204).json();
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    };
}

module.exports = new BookController();
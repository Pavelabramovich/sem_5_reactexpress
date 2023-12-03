const uuid = require('uuid');
const path = require('path');

const {Product} = require('../models/models')
const ApiError = require('../errors/apiError');


class ProductController {
    async create(req, res, next) {
        try {
            const {name, description, price, categoryId} = req.body;
            const {img} = req.files;

            const filename = uuid.v4() + '.jpg';
            img.mv(path.resolve(__dirname, '..', 'static', filename));

            const product = await Product.create({name, description, price, categoryId, img: filename});

            return res.json(product);
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        let {categoryId, limit, page} = req.query;

        page ||= 0;
        limit = 100;

        const offset = page * limit;
        
        const options = {limit, offset}

        if (categoryId) {
            options['where'] = {categoryId};
        }

        const products = await Product.findAndCountAll(options);

        return res.json(products);
    }

    async getById(req, res) {
        const {id} = req.params;
 
        const product = await Product.findOne({where:{id}});
        return res.json(product)
    }
}

module.exports = new ProductController();
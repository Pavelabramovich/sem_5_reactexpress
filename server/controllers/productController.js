const uuid = require('uuid');
const path = require('path');


const ApiError = require('../errors/apiError');

const pool = require('../db');

const ProductRepository = require('../repositories/ProductRepository');


class ProductController {
    async create(req, res, next) {
        try {
            const {name, description, price, categoryId} = req.body;

            let fname;

            try {
                if (req.files === null) {
                    fname = "image_default.png";
                } else {
                    const {img} = req.files;

                    const filename = uuid.v4() + '.jpg';
                    img.mv(path.resolve(__dirname, '..', 'static', filename));
    
                    fname = filename;
                }
            } catch (error) {
                fname = "image_default.png";
            }

            const productWithSameName = await ProductRepository.getByName(name);

            if (productWithSameName) {
                return next(ApiError.badRequest(JSON.stringify({field: 'name', text: "Product with same name already exists."})));
            }

            const product = await ProductRepository.create({name, description, price, categoryId, img: fname});

            return res.json(product);
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        let {categoryId} = req.query;

        let products = await ProductRepository.getAll(categoryId);
        products = {rows: products};

        return res.json(products);
    }

    async getById(req, res) {
        const {id} = req.params;
 
        const product = await ProductRepository.getById(id);
        return res.json(product)
    }

    async update(req, res, next) {
        try {
            const {id} = req.params;
            const newObj = { ...req.body, updatedAt: Date.now() };

            try {
                if (req.files === null) {
                    
                } else {
                    const {img} = req.files;

                    const filename = uuid.v4() + '.jpg';
                    img.mv(path.resolve(__dirname, '..', 'static', filename));
    
                    newObj['img'] = filename;
                }
            } catch (error) {
                
            }

            const result = await ProductRepository.update(id, newObj);
      
            return res.json(result);
            
        } catch (e) {
            return next(ApiError.badRequest(e.message + "lalalalla"));
        }
    };

    async delete(req, res, next) {
        try {
            const {id} = req.params;
            
            const result = await ProductRepository.delete(id);
        
            res.status(204).json();
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    };
}

module.exports = new ProductController();
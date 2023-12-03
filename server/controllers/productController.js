const uuid = require('uuid');
const path = require('path');

const {Product} = require('../models/models')
const ApiError = require('../errors/apiError');


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


            // const filename = uuid.v4() + '.jpg';
            // img.mv(path.resolve(__dirname, '..', 'static', filename));

            const product = await Product.create({name, description, price, categoryId, img: fname});

            return res.json(product);
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        let {categoryId} = req.query;

        const options = {}

        let products; 

        if (categoryId) {
            options['where'] = {categoryId};
            products = await Product.findAndCountAll(options);
        } else {
            products = await Product.findAll();
            products = {rows: products};
        }

      

        console.log("---------------------------------------------")
        console.log(products)
        console.log(typeof products);
        console.log(products.rows);
        console.log(Object.entries(products));
        console.log()

        return res.json(products);
    }

    async getById(req, res) {
        const {id} = req.params;
 
        const product = await Product.findOne({where:{id}});
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
            

            const result = await Product.update(newObj,
            {
                where: {id},
            });
      
            if (result[0] === 0) {
                return next(ApiError.badRequest("Product with that ID not found"));
            }
      
            const product = await Product.findByPk(id);
            return res.json(product);
            
        } catch (e) {
            return next(ApiError.badRequest(e.message + "lalalalla"));
        }
    };

    async delete(res, req, next) {
        try {
            const {id} = req.params;

            const result = await Product.destroy({
                where: { id },
                force: true,
            });
        
            if (result === 0) {
                return res.status(404).json({
                    status: "fail",
                    message: "Note with that ID not found",
                });
            }
        
            res.status(204).json();
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    };
}

module.exports = new ProductController();
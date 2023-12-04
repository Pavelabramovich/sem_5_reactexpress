const pool = require('../db2');
const nameof = require('../utils/nameof');


class ProductRepository {

    static async create(product) {
        return new Promise(function (resolve, reject) {
            const {name, description, price, categoryId, img} = product;

            pool.query(
                String.raw
                    `INSERT INTO products (name, price, description, "categoryId", img, "createdAt", "updatedAt")  
                     VALUES ('${name}', ${price}, '${description}', ${categoryId}, '${img}', NOW(), NOW()) RETURNING *`,
                (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    if (results && results.rows) {
                        resolve(results.rows[0]);
                    } else {
                        reject(new Error("No results found"));
                    }
                }   
            );
        });
    };


    static async getAll(categoryId) {
        try {
            return await new Promise(function (resolve, reject) {
                let query = categoryId 
                    ? String.raw`SELECT * FROM products p WHERE p."categoryId" = ${categoryId}`
                    : String.raw`SELECT * FROM products p`;

                pool.query(query, (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    if (results && results.rows) {
                        resolve(results.rows);
                    } else {
                        reject(new Error("No results found"));
                    }
                });
            });
        } catch (error_1) {
            console.error(error_1);
            throw new Error("Internal server error");
        }
    };


    static async getById(id) {
        if (!id) {
            throw new Error("No id");
        }

        try {
            return await new Promise(function (resolve, reject) {
                let query = String.raw`SELECT * FROM products p WHERE p."id" = ${id}`

                pool.query(query, (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    if (results && results.rows) {
                        resolve(results.rows[0]);
                    } else {
                        reject(new Error("No results found"));
                    }
                });
            });
        } catch (error_1) {
            console.error(error_1);
            throw new Error("Internal server error");
        }
    };


    static async update(id, product) {
        return new Promise(function (resolve, reject) {
            const {name, description, price, categoryId, img} = product;
            const fields = {name, description, price, categoryId, img};

            let query = "UPDATE products SET";

            for (let field in fields) {
                if (fields[field]) {
                    query += String.raw` "${field}" = '${fields[field]}',`;
                }
            }

            if (query.endsWith(',')) {
                query = query.slice(0, -1);
            }

            query += ` WHERE id = ${id} RETURNING *`;

            pool.query(query, (error, results) => {
                if (error) {
                    reject(error);
                }
                if (results && results.rows) {
                    resolve(results.rows[0]);
                } else {
                    reject(new Error("No results found"));
                }
            });
        });
    };


    static async delete(id) {
        return new Promise(function (resolve, reject) {
            pool.query(
                `DELETE FROM products WHERE id = ${id}`,
                (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    
                    resolve(`Product deleted with ID: ${id}`);
                }
            );
        });
    };
}


module.exports = ProductRepository;
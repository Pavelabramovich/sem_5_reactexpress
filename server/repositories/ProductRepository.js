const pool = require('../db2');

class ProductRepository {
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
}


module.exports = ProductRepository;
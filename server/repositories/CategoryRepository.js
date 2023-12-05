const pool = require('../db');


class CategoryRepository {

    static async create(category) {
        return new Promise(function (resolve, reject) {
            const {name} = category;

            pool.query(
                String.raw
                    `INSERT INTO categories (name, "createdAt", "updatedAt")  
                     VALUES ('${name}', NOW(), NOW()) RETURNING *`,
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


    static async getAll() {
        try {
            return await new Promise(function (resolve, reject) {
                let query = String.raw`SELECT * FROM categories`;

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
                let query = String.raw`SELECT * FROM categories c WHERE c."id" = ${id}`

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


    static async getByName(name) {
        if (!name) {
            throw new Error("No name");
        }

        try {
            return await new Promise(function (resolve, reject) {
                let query = String.raw`SELECT * FROM categories c WHERE c."name" = '${name}'`

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


    static async update(id, name) {
        return new Promise(function (resolve, reject) {
            if (!name) {
                reject(new Error("No name"));
            }

            let query = `UPDATE categories SET name = '${name}' WHERE id = ${id} RETURNING *`;

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
                `DELETE FROM categories WHERE id = ${id}`,
                (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    
                    resolve(`Category deleted with ID: ${id}`);
                }
            );
        });
    };
}


module.exports = CategoryRepository;
const pool = require('../db');


const authorIdToCamelCase = (book) => {
    book.authorId = book.author_id; 
    delete book.author_id; 
    return book;
}


class BookRepository {

    static async create(book) {
        return new Promise(function (resolve, reject) {
            const {title, price, authorId, image} = book;

            pool.query(
                String.raw
                    `INSERT INTO books (title, price, "author_id", image)  
                     VALUES ('${title}', ${price}, '${authorId}', '${image}') RETURNING *`,
                (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    if (results && results.rows) {
                        resolve(results.rows.map(authorIdToCamelCase)[0]);
                    } else {
                        reject(new Error("No results found"));
                    }
                }   
            );
        });
    };


    static async getAll(authorId) {
        try {
            return await new Promise(function (resolve, reject) {
                let query = authorId 
                    ? String.raw`SELECT * FROM books b WHERE b."author_id" = ${authorId}`
                    : String.raw`SELECT * FROM books b`;

                pool.query(query, (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    if (results && results.rows) {
                        resolve(results.rows.map(authorIdToCamelCase));
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
                let query = String.raw`SELECT * FROM books b WHERE b."id" = ${id}`

                pool.query(query, (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    if (results && results.rows) {
                        resolve(results.rows.map(authorIdToCamelCase)[0]);
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


    static async getByTitle(title) {
        if (!title) {
            throw new Error("No title");
        }

        try {
            return await new Promise(function (resolve, reject) {
                let query = String.raw`SELECT * FROM books b WHERE b."title" = '${title}'`

                pool.query(query, (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    if (results && results.rows) {
                        resolve(results.rows.map(authorIdToCamelCase)[0]);
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


    static async update(id, book) {
        return new Promise(function (resolve, reject) {
            const {title, price, authorId, image} = book;
            const fields = {title, price, author_id: authorId, image};

            let query = "UPDATE books SET";

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
                    resolve(results.rows.map(authorIdToCamelCase)[0]);
                } else {
                    reject(new Error("No results found"));
                }
            });
        });
    };


    static async delete(id) {
        return new Promise(function (resolve, reject) {
            pool.query(
                `DELETE FROM books WHERE id = ${id}`,
                (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    
                    resolve(`Book deleted with ID: ${id}`);
                }
            );
        });
    };
}


module.exports = BookRepository;
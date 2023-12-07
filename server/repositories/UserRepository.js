const pool = require('../db');


const roleIdToCamelCase = (user) => {
    user.roleId = user.role_id; 
    delete user.role_id; 
    return user;
}



class UserRepository {

    static async create(user) {
        return new Promise(function (resolve, reject) {
            const {login, password, roleId, couponId} = user;
            

            pool.query(
                String.raw
                    `INSERT INTO users (login, password, "role_id" ${ couponId ? ', coupon_id' : ''})  
                     VALUES ('${login}', '${password}', '${roleId}' ${couponId ? `, ${couponId}` : ''}) RETURNING *`,
                (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    if (results && results.rows) {
                        resolve(results.rows.map(roleIdToCamelCase)[0]);
                    } else {
                        reject(new Error("No results found"));
                    }
                }   
            );
        });
    };


    static async getAll(roleId) {
        try {
            return await new Promise(function (resolve, reject) {
                let query = roleId 
                    ? String.raw`SELECT * FROM users u WHERE u."role_id" = ${roleId}`
                    : String.raw`SELECT * FROM users u`;

                pool.query(query, (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    if (results && results.rows) {
                        resolve(results.rows.map(roleIdToCamelCase));
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
        if (!id || !/^[0-9]*$/.test(`${id}`)) {
            throw new Error("No id");
        }

        try {
            return await new Promise(function (resolve, reject) {
                let query = String.raw`SELECT * FROM users u WHERE u."id" = '${id}'`

                pool.query(query, (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    if (results && results.rows) {
                        resolve(results.rows.map(roleIdToCamelCase)[0]);
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


    static async getByLogin(login) {
        if (!login) {
            throw new Error("No login");
        }

        try {
            return await new Promise(function (resolve, reject) {
                let query = String.raw`SELECT * FROM users u WHERE u."login" = '${login}'`

                pool.query(query, (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    if (results && results.rows) {
                        resolve(results.rows.map(roleIdToCamelCase)[0]);
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


    static async update(id, user) {
        return new Promise(function (resolve, reject) {
            const {login, password, roleId, couponId} = user;
            const fields = {login, password, role_id: roleId, coupon_id: couponId};

            let query = "UPDATE users SET";

            for (let field in fields) {
                if (fields[field]) {
                    query += String.raw` "${field}" = '${fields[field]}',`;
                } else if (fields[field] === null) {
                    query += String.raw` "${field}" = NULL,`;
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
                    resolve(results.rows.map(roleIdToCamelCase)[0]);
                } else {
                    reject(new Error("No results found"));
                }
            });
        });
    };

    static async addBookToCart(userId, bookId) {
        return new Promise(function (resolve, reject) {
            let query = `CALL add_book_to_cart_by_user_id(${userId}, ${bookId});`;


            pool.query(query, (error, results) => {
                if (error) {
                    reject(error);
                }

                resolve(`Books added to cart.`);
            });
        });
    }

    static async removeBookFromCart(userId, bookId) {
        return new Promise(function (resolve, reject) {
            let query = `CALL remove_book_from_cart(${userId}, ${bookId});`;


            pool.query(query, (error, results) => {
                if (error) {
                    reject(error);
                }

                resolve(`Books removed from to cart.`);
            });
        });
    }


    static async delete(id) {
        return new Promise(function (resolve, reject) {
            pool.query(
                `DELETE FROM users WHERE id = ${id}`,
                (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    
                    resolve(`User deleted with ID: ${id}`);
                }
            );
        });
    };


    static async getProviders() {
        try {
            return await new Promise(function (resolve, reject) {
                let query = String.raw
                `SELECT *  
                
                        FROM users u 
                        WHERE u.id IN (SELECT p.user_ptr_id FROM providers p);`;

                pool.query(query, (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    if (results && results.rows) {
                        resolve(results.rows.map(roleIdToCamelCase));
                    } else {
                        reject(new Error("No results found"));
                    }
                });
            });
        } catch (error_1) {
            console.error(error_1);
            throw new Error("Internal server error");
        }
    }


    static async isProvider(id) {
        if (!id) {
            throw new Error("No Id");
        }

        try {
            return await new Promise(function (resolve, reject) {
                let query = String.raw`SELECT * FROM providers p WHERE p."user_ptr_id" = '${id}'`

                pool.query(query, (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    if (results && results.rows) {
                        resolve(!!results.rows.length);
                    } else {
                        reject(new Error("No results found"));
                    }
                });
            });
        } catch (error_1) {
            console.error(error_1);
            throw new Error("Internal server error");
        }
    }

    static async addProvider(id) {
        return new Promise(function (resolve, reject) {
            pool.query(
                String.raw
                    `INSERT INTO providers (user_ptr_id)  
                     VALUES ('${id}') ON CONFLICT ("user_ptr_id") DO NOTHING;`,
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
    }

    static async removeProvider(id) {
        return new Promise(function (resolve, reject) {
            pool.query(
                `DELETE FROM providers WHERE user_ptr_id = ${id}`,
                (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    
                    resolve(`Provider deleted with ID: ${id}`);
                }
            );
        });
    }


    static async getUserCartItems(userId) {
        try {
            return await new Promise(function (resolve, reject) {
                let query = String.raw`SELECT * FROM select_books_by_user_cart(${userId});`;
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


    static async fullOrder(id) {
        return new Promise(function (resolve, reject) {
            pool.query(
                `CALL create_full_order(${id});`,
                (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    
                    resolve(`Order created with ID: ${id}`);
                }
            );
        });
    }

    static async createReview(userId, bookId, text) {
        return new Promise(function (resolve, reject) {
            pool.query(
                `INSERT INTO reviews (user_id, book_id, text)  
                 VALUES ('${userId}', '${bookId}', '${text}');`,
                (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    
                    resolve(`Review created`);
                }
            );
        });
    }

    static async getOrders(userId) {
        try {
            return await new Promise(function (resolve, reject) {
                let query = String.raw
                    `SELECT
                        o.id AS id,
                        o.time AS time

                        FROM users u
                        JOIN orders o ON o.user_id = u.id AND u.id = ${userId}`;
                
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
    }

    static async getReviews(bookId) {
        try {
            return await new Promise(function (resolve, reject) {
                let query = String.raw
                    `SELECT 
                        b.title AS title,
                        r.text AS text,
                        u.login AS login

                        FROM reviews r
                        JOIN books b ON b.id = r.book_id AND b.id = ${bookId}
                        JOIN users u ON u.id = r.user_id;`;
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
    }

    //getOrderInfo


    static async getOrderInfo(orderId) {
        try {
            return await new Promise(function (resolve, reject) {
                let query = String.raw
                    `SELECT 
                        o.id AS id,
                        u.login AS login,
                        b.title AS title,
                        ob.count AS count
                        
                        FROM orders o
                        JOIN users u ON u.id = o.user_id
                        JOIN orders_books ob ON ob.order_id = o.id AND o.id = ${orderId}
                        JOIN books b ON b.id = ob.book_id;`;
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
    }
}


module.exports = UserRepository;
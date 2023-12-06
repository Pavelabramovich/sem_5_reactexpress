const pool = require('../db');


class CouponRepository {

    static async create(coupon) {
        return new Promise(function (resolve, reject) {
            const {discount} = coupon;

            pool.query(
                String.raw
                    `INSERT INTO coupons (discount)  
                     VALUES ('${discount}') RETURNING *`,
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
                let query = String.raw`SELECT * FROM coupons`;

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
                let query = String.raw`SELECT * FROM coupons c WHERE c."id" = ${id}`

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


    static async getByDiscount(discount) {
        if (!discount) {
            throw new Error("No DisCount");
        }

        try {
            return await new Promise(function (resolve, reject) {
                let query = String.raw`SELECT * FROM coupons c WHERE c."discount" = '${discount}'`

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

    static async getByUserId(id) {
        if (!id) {
            throw new Error("No id");
        }

        try {
            return await new Promise(function (resolve, reject) {
                let query = String.raw
                `SELECT
                    c.id,
                    c.discount
                    
                    FROM coupons c
                    JOIN users u ON u.coupon_id = c.id AND u.id = ${id};`

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
    }

    static async update(id, discount) {
        return new Promise(function (resolve, reject) {
            if (!discount) {
                reject(new Error("No discount"));
            }

            let query = `UPDATE coupons SET discount = '${discount}' WHERE id = ${id} RETURNING *`;

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
                `DELETE FROM coupons WHERE id = ${id}`,
                (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    
                    resolve(`Coupon deleted with ID: ${id}`);
                }
            );
        });
    };
}


module.exports = CouponRepository;
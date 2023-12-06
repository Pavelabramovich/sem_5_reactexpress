const ApiError = require('../errors/apiError');

const CouponRepository = require('../repositories/CouponRepository');


class CouponController {
    async create(req, res, next) {
        const {discount} = req.body;

        const couponWithSameDiscount = await CouponRepository.getByDiscount(discount)

        if (couponWithSameDiscount) {
            return next(ApiError.badRequest("Coupon with same discount already exists."));
        }

        const coupon = await CouponRepository.create({discount});

        return res.json(coupon);
    }

    async getAll(req, res) {
        const coupons = await CouponRepository.getAll();
        return res.json(coupons);
    }

    async update(req, res, next) {
        try {
            const {id} = req.params;
            const {discount} = req.body;

            const coupon = await CouponRepository.update(id, discount);
      
            return res.json(coupon);
            
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params;
            
            const result = await CouponRepository.delete(id);
        
            res.status(204).json();
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new CouponController();
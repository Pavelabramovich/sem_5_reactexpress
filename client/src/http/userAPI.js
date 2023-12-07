import { $host, $authHost } from './index';
import { jwtDecode } from 'jwt-decode';


export const registration = async (login, password) => {
    try {
        const {data} = await $host.post('api/user/registration', {login, password});
        localStorage.setItem('token', data.token)
        return jwtDecode(data.token);
    } catch (e) {
       
        let fieldError;

        try {
            fieldError = JSON.parse(e?.response?.data?.message)
        } catch (jsonError) {
            throw (e?.response?.data?.message.split(':')[1] || "Incorrect format");
        }

        throw fieldError;
    }
}

export const login = async (login, password) => {
    try {
        const {data} = await $host.post('api/user/login', {login, password});
        localStorage.setItem('token', data.token)

        return jwtDecode(data.token);
    } catch (e) {
        throw (JSON.parse(e?.response?.data?.message) || "Unexpected error");
    }
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth');

    localStorage.setItem('token', data.token)
    return jwtDecode(data.token);
}

export const getUsers = async (roleId) => {
    const res = await $host.get('api/user', { params: {roleId}});

    const {data} = res;
    return data;
}


export const updateUser = async (id, user) => {
    const {data} = await $authHost.patch(`api/user/${id}`, user);
    return data;
}






export const createRole = async (name) => {
    const {data} = await $authHost.post('api/role', {name});
    return data;
}

export const getRoles = async () => {
    const {data} = await $host.get('api/role');
    return data;
}

export const updateRole = async (id, role) => {
    const {data} = await $authHost.patch(`api/role/${id}`, role);
    return data;
}

export const deleteRole = async (id) => {
    const {data} = await $authHost.delete(`api/role/${id}`);
    return data;
}

export const getProviders = async (id) => {
    const {data} = await $authHost.get(`api/user/providers`);
    return data;
}


export const isProvider = async (id) => {
    const {data} = await $authHost.get(`api/user/${id}/provider`);
    return data;
}


export const addProvider = async (id) => {
    const {data} = await $authHost.post(`api/user/${id}/provider`);
    return data;
}

export const removeProvider = async (id) => {
    const {data} = await $authHost.delete(`api/user/${id}/provider`);
    return data;
}




export const createCoupon = async (discount) => {
    const {data} = await $authHost.post('api/coupon', {discount});
    return data;
}

export const getCoupons = async () => {
    const {data} = await $host.get('api/coupon');
    return data;
}

export const getCouponByUserId = async (id) => {
    const {data} = await $host.get(`api/coupon/user/${id}`);
    return data;
}

export const updateCoupon = async (id, coupon) => {
    const {data} = await $authHost.patch(`api/coupon/${id}`, coupon);
    return data;
}

export const deleteCoupon = async (id) => {
    const {data} = await $authHost.delete(`api/coupon/${id}`);
    return data;
}

export const addBookToCart = async (userId, bookId) => {
    const {data} = await $authHost.post(`api/user/${userId}/cart/${bookId}`);
    return data;
}

export const removeBookFromCart = async (userId, bookId) => {
    const {data} = await $authHost.delete(`api/user/${userId}/cart/${bookId}`);
    return data;
}

export const getUserCartItems = async (userId) => {
    const {data} = await $authHost.get(`api/user/${userId}/cart`);
    return data;
}

export const fullOrder = async (userId) => {
    const {data} = await $authHost.post(`api/user/${userId}/order`);
    return data;
}


export const createReview = async (userId, bookId, text) => {
    const {data} = await $authHost.post(`api/user/review/${userId}/${bookId}`, {text})
    return data;
}

export const getReviews = async (bookId) => {
    const {data} = await $host.get(`api/user/review/${bookId}`)
    return data;
}


export const getOrders = async (userId) => {
    const {data} = await $host.get(`api/user/${userId}/orders`)
    return data;
}


export const getOrderInfo = async (orderId) => {
    const {data} = await $authHost.get(`api/user/orderInfo/${orderId}`);
    return data;
}
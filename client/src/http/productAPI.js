import { $host, $authHost } from './index';


export const createProduct = async (product) => {
    const {data} = await $authHost.post('api/product', product);
    return data;
}

export const getProducts = async (categoryId) => {
    const {data} = await $host.get('api/product', { params: {categoryId}});
    return data;
}


export const getProduct = async (id) => {
    const {data} = await $host.get(`api/product/${id}`);
    return data;
}


export const createCategory = async (name) => {
    const {data} = await $authHost.post('api/category', {name});
    return data;
}

export const getCategories = async () => {
    const {data} = await $host.get('api/category');
    return data;
}
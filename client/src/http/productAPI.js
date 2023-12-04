import { $host, $authHost } from './index';


export const createProduct = async (product) => {
    try {
        const {data} = await $authHost.post('api/product', product);
        return data;
    } catch (e) {
        alert(e);
        console.log(e);
        console.log(JSON.stringify(e));


        let fieldError;

        try {
            fieldError = JSON.parse(e?.response?.data?.message)
        } catch (jsonError) {            
            throw (e?.response?.data?.message);
        }

        throw fieldError;
    }
}

export const getProducts = async (categoryId) => {
    const res = await $host.get('api/product', { params: {categoryId}});

    const {data} = res;
    return data;
}


export const getProduct = async (id) => {
    const {data} = await $host.get(`api/product/${id}`);
    return data;
}


export const updateProduct = async (id, product) => {
    const {data} = await $authHost.patch(`api/product/${id}`, product);
    return data;
}


export const deleteProduct = async (id) => {
    const {data} = await $authHost.delete(`api/product/${id}`);
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
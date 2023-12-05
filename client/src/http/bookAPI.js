import { $host, $authHost } from './index';


export const createBook = async (book) => {
    try {
        const {data} = await $authHost.post('api/product', book);
        return data;
    } catch (e) {
        let fieldError;

        try {
            fieldError = JSON.parse(e?.response?.data?.message)
        } catch (jsonError) {            
            throw (e?.response?.data?.message);
        }

        throw fieldError;
    }
}

export const getBooks = async (authorId) => {
    const res = await $host.get('api/product', { params: {authorId}});

    const {data} = res;
    return data;
}


export const getBook = async (id) => {
    const {data} = await $host.get(`api/product/${id}`);
    return data;
}


export const updateBook = async (id, book) => {
    const {data} = await $authHost.patch(`api/product/${id}`, book);
    return data;
}


export const deleteBook = async (id) => {
    const {data} = await $authHost.delete(`api/product/${id}`);
    return data;
}


export const createAuthor = async (name) => {
    const {data} = await $authHost.post('api/category', {name});
    return data;
}

export const getAuthors = async () => {
    const {data} = await $host.get('api/category');
    return data;
}
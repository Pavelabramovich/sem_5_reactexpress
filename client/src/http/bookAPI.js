import { $host, $authHost } from './index';


export const createBook = async (book) => {
    try {
        const {data} = await $authHost.post('api/book', book);
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
    const res = await $host.get('api/book', { params: {authorId}});

    const {data} = res;
    return data;
}


export const getBook = async (id) => {
    const {data} = await $host.get(`api/book/${id}`);
    return data;
}


export const updateBook = async (id, book) => {
    const {data} = await $authHost.patch(`api/book/${id}`, book);
    return data;
}

export const getBookCategories = async (id) => {
    const {data} = await $host.get(`api/book/${id}/categories`)
    return data;
}

export const getCategoryBooks = async (id) => {
    const {data} = await $host.get(`api/category/${id}/books`)
    return data;
}

export const updateBookCategories = async (id, categoriesId) => {
    const {data} = await $authHost.post(`api/book/${id}/categories`, {categoriesId})
    return data;
}

export const deleteBook = async (id) => {
    const {data} = await $authHost.delete(`api/book/${id}`);
    return data;
}



export const createAuthor = async (name) => {
    const {data} = await $authHost.post('api/author', {name});
    return data;
}

export const getAuthors = async () => {
    const {data} = await $host.get('api/author');
    return data;
}

export const updateAuthor = async (id, author) => {
    const {data} = await $authHost.patch(`api/author/${id}`, author);
    return data;
}

export const deleteAuthor = async (id) => {
    const {data} = await $authHost.delete(`api/author/${id}`);
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

export const updateCategory = async (id, category) => {
    const {data} = await $authHost.patch(`api/category/${id}`, category);
    return data;
}

export const deleteCategory = async (id) => {
    const {data} = await $authHost.delete(`api/category/${id}`);
    return data;
}



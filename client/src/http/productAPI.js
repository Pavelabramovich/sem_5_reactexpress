import { $host, $authHost } from './index';


export const createProduct = async (product) => {
    const {data} = await $authHost.post('api/product', product);
    return data;
}

export const getProducts = async (categoryId) => {
   // alert("data")
    const res = await $host.get('api/product', { params: {categoryId}});
    
  //  alert("res")
 //   console.log(res);

    const {data} = res;
  //  console.log("data")
  //  console.log(data)
  //  console.log(JSON.stringify(data));
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
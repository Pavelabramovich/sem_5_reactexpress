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


export const createRole = async (name) => {
    const {data} = await $authHost.post('api/role', {name});
    return data;
}

export const getRoles = async () => {
    const {data} = await $host.get('api/role');
    return data;
}
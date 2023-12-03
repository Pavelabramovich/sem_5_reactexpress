import { $host, $authHost } from './index';
import { jwtDecode } from 'jwt-decode';


export const registration = async (login, password) => {
    try {
        const {data} = await $host.post('api/user/registration', {login, password});
        return jwtDecode(data.token);
    } catch (e) {
        throw (JSON.parse(e?.response?.data?.message) || "Unexpected error");
    }
}

export const login = async (login, password) => {
    try {
        const {data} = await $host.post('api/user/login', {login, password});
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
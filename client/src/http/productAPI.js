import { $host } from './index';


export const registration = async (login, password) => {
    try {
        const {data} = await $host.post('api/user/registration', {login, password, role: 2});
        return jwtDecode(data.token);
    } catch (e) {
        throw (e?.response?.data?.message || "Unexpected error");
    }
}

export const login = async (login, password) => {
    try {
        const {data} = await $host.post('api/user/login', {login, password});
        return jwtDecode(data.token);
    } catch (e) {
        throw (e?.response?.data?.message || "Unexpected error");
    }
}


export const check = async () => {
    const {data} = await $authHost.get('api/user/auth');

    localStorage.setItem('token', data.token)
    return jwtDecode(data.token);
}
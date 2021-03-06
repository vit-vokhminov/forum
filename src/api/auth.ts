import axios from 'axios';
import { TypeLogin, TypeRegistration } from 'Types/ApiAuthTypes';

const instanceAPI = axios.create({
    baseURL: `${process.env.API_URL}/api/`,
    withCredentials: true,
});

instanceAPI.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

instanceAPI.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response.status === 401 &&
            error.config &&
            !error.config._isRetry
        ) {
            originalRequest._isRetry = true;
            try {
                const response = await axios.get(`/refresh`, {
                    withCredentials: true,
                });
                localStorage.setItem('token', response.data.accessToken);
                return instanceAPI.request(originalRequest);
            } catch (e) {
                console.log('НЕ АВТОРИЗОВАН');
            }
        }
        throw error;
    }
);

export const API_AUTH = {
    // Авторизация
    async login(values: TypeLogin) {
        return await instanceAPI.post('/login', values);
    },

    // Регистрация
    async registration(values: TypeRegistration) {
        return await instanceAPI.post('/registration', values);
    },

    // Выйти из аккаунта
    async logout() {
        return await instanceAPI.post('/logout');
    },

    // проверка авторизации пользователя при загрузке сайта
    async checkAuth() {
        return await instanceAPI.get('/refresh');
    },
};

export default instanceAPI;

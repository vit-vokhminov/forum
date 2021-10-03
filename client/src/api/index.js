import axios from 'axios';

const instanceAPI = axios.create({
    baseURL: `http://localhost:5000/`,
    headers: {
        post: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        put: {
            'Content-Type': 'application/json; charset=utf-8',
        },
    },
});

export const API = {
    // Авторизация
    async signIn(value) {
        return await instanceAPI.post(`/api/signin`, value);
    },

    // Регистрация
    async signUp(value) {
        return await instanceAPI.post(`/api/signup`, value);
    },

    // Получить все посты
    async getPosts() {
        return await instanceAPI.get('/api/posts');
    },

    // Получить пост по id
    async getPost(id) {
        return await instanceAPI.get(`/api/post/${id}`);
    },

    // Создать новый пост
    async addPost(values) {
        return await instanceAPI.post('/api/post/', values);
    },

    // Изменить пост по id
    async editPost(id, values) {
        console.log(id, values);
        return await instanceAPI.put(`/api/post/${id}`, values);
    },

    // Удалить пост по id
    async delete(id) {
        return await instanceAPI.delete(`/api/post/${id}`);
    },

    // Получить контакты
    async getContacts() {
        return await instanceAPI.get('/contacts');
    },

    // Получить все комментарии поста
    async getMessages(id) {
        return await instanceAPI.get(`/api/messages/${id}`);
    },

    // Добавить комментарий
    async addMessage(id, value) {
        return await instanceAPI.post(`/api/message/${id}`, value);
    },

    // Получить все ответы на комментарий
    async getMessageToMessage(id) {
        return await instanceAPI.get(`/api/answers/${id}`);
    },

    // Добавить комментарий к комментарию
    async addMessageToMessage(id, value) {
        return await instanceAPI.post(`/api/answer/${id}`, value);
    },
};
import axios from 'axios';

const instanceAPI = axios.create({
    baseURL: `${process.env.API_URL}`,
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
    async getMessageToMessage(postId, messageId) {
        return await instanceAPI.get(`/api/answers/${postId}/${messageId}`);
    },

    // Добавить комментарий к комментарию
    async addMessageToMessage(id, value) {
        return await instanceAPI.post(`/api/answer/${id}`, value);
    },
};

import axios from 'axios';

const instanceAPI = axios.create({
    baseURL: `http://localhost:5000/`,
    headers: {
        post: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        put: {
            'Content-Type': 'application/json; charset=utf-8'
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
        console.log(id, values)
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

     // Добавить комментарий
     async addMessages(id, value) {
        return await instanceAPI.post(`/api/message/${id}`, value);
    },

};

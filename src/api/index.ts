import axios from 'axios';
import {
    AddPostType,
    AddPostResponseType,
    EditPostType,
    AddMessageValueType,
} from 'types/ApiForumTypes';
import { PostType } from 'Types/ForumTypes';

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
    async getPosts(): Promise<Array<PostType>> { //!: Promise<[PostType]>
        return await instanceAPI.get('/api/posts');
    },

    // Получить пост по id
    async getPost(id: string): Promise<PostType> {
        return await instanceAPI.get(`/api/post/${id}`);
    },

    // Создать новый пост
    async addPost(values: AddPostType){
        return await instanceAPI.post<AddPostResponseType>('/api/post/', values);
    },

    // Изменить пост по id
    async editPost(id: string, values: EditPostType) {
        return await instanceAPI.put(`/api/post/${id}`, values);
    },

    // Удалить пост по id
    async delete(id: string) {
        return await instanceAPI.delete(`/api/post/${id}`);
    },

    // Получить контакты
    async getContacts() {
        return await instanceAPI.get('/contacts');
    },

    // Получить все комментарии поста
    async getMessages(id: string) {
        return await instanceAPI.get(`/api/messages/${id}`);
    },

    // Добавить комментарий
    async addMessage(id: string, value: AddMessageValueType) {
        return await instanceAPI.post(`/api/message/${id}`, value);
    },

    // Получить все ответы на комментарий
    async getMessageToMessage(postId: string, messageId: string) {
        return await instanceAPI.get(`/api/answers/${postId}/${messageId}`);
    },

    // Добавить комментарий к комментарию
    async addMessageToMessage(id: string, value: AddMessageValueType) {
        return await instanceAPI.post(`/api/answer/${id}`, value);
    },
};

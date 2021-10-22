export type AddPostType = {
    author: string,
    text: string,
    title: string,
};

export type AddPostResponseType = {
    id: number;
    author: string;
    title: string;
    text: string;
    updatedAt: string;
    createdAt: string;
};

export type EditPostType = {
    text: string,
    title: string,
};

export type AddMessageValueType = {
    author: string,
    messageId: number,
    text: string
};

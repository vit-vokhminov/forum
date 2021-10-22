import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { PropsTopicType } from 'Types/ForumTypes';
import { RootState } from 'ReduxStore/userReducer';

function Topic(props : PropsTopicType) {
    const user = useSelector((state: RootState) => state.userReducer.user);
    const { post, handleDelete } = props;

    return (
        <>
            {!!post && (
                <article className='post'>
                    <div className='info'>
                        <span>{post.author}</span>
                        <span>
                            {new Date(post.createdAt).toLocaleDateString() ||
                                'Без даты'}
                        </span>
                    </div>
                    <h2>{post.title}</h2>
                    <p>{post.text}</p>

                    {user?.login === post.author && (
                        <>
                            <Link
                                to={`/edit/${post.id}`}
                                className='btn-edit'
                                title='Редактировать'
                            >
                                <i className='fas fa-edit'></i>
                            </Link>
                            <button
                                className='btn-delete'
                                data-id={post.id}
                                onClick={handleDelete}
                                title='Удалить'
                            >
                                <i
                                    className='fas fa-trash-alt'
                                    data-id={post.id}
                                ></i>
                            </button>
                        </>
                    )}
                </article>
            )}
        </>
    );
}

export default Topic;

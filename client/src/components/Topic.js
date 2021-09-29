import React from 'react';
import { Link } from 'react-router-dom';

function Topic(props) {
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
                    <Link
                        to={`/edit/${post._id}`}
                        className='btn-edit'
                        title='Редактировать'
                    >
                        <i className='fas fa-edit'></i>
                    </Link>
                    <button
                        className='btn-delete'
                        data-id={post._id}
                        onClick={handleDelete}
                        title='Удалить'
                    >
                        <i className='fas fa-trash-alt' data-id={post._id}></i>
                    </button>
                </article>
            )}
        </>
    );
}

export default Topic;

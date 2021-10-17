import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Nav } from 'Components';
import { API } from 'Api';
import socket from 'Api/socket';

function Posts() {
    const user = useSelector((state) => state.userReducer.user);
    const [posts, setPosts] = React.useState(null);

    const handleGetPosts = React.useCallback(() => {
        API.getPosts().then((response) => {
            setPosts(response.data);
        });
    }, [setPosts]);

    React.useEffect(() => {
        handleGetPosts();
        socket.on('DELETE_POST', function () {
            handleGetPosts();
        });

        socket.on('ADD_POST', function () {
            handleGetPosts();
        });

        return () => {
            socket.off('DELETE_POST');
            socket.off('ADD_POST');
        };
    }, [handleGetPosts]);

    const handleDelete = React.useCallback((e) => {
        const id = e.target.dataset.id;
        const conf = window.confirm(
            `Серьёзно? Ты хочешь удалить этот прекрасный пост?`
        );
        if (conf) {
            API.delete(id)
                .then((response) => {
                    socket.emit('DELETE_POST', id);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    });

    return (
        <div className='content'>
            <Nav />

            <h1>Темы:</h1>
            <ul>
                {!!posts &&
                    posts.map((elem) => (
                        <article key={elem.id}>
                            <div className='info'>
                                <span>{elem.author}</span>
                                <span>
                                    {new Date(
                                        elem.createdAt
                                    ).toLocaleDateString()}
                                </span>
                            </div>
                            <h2>
                                <Link to={`/post/${elem.id}`}>
                                    {elem.title}
                                </Link>
                            </h2>
                            <p>{elem.text}</p>
                            {user?.login === elem.author && (
                                <button
                                    className='btn-delete'
                                    data-id={elem.id}
                                    onClick={handleDelete}
                                    title='Удалить'
                                >
                                    <i
                                        className='fas fa-trash-alt'
                                        data-id={elem.id}
                                    ></i>
                                </button>
                            )}
                        </article>
                    ))}
            </ul>
        </div>
    );
}

export default Posts;

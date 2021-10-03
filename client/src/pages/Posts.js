import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from '../components';
import { API } from '../api';
//import socket from '../api/socket';

function Posts() {
    const [posts, setPosts] = React.useState(null);

    const handleGetPosts = React.useCallback(() => {
        API.getPosts().then((response) => {
            setPosts(response.data);
        });
    },[setPosts]);

    React.useEffect(() => {
        handleGetPosts();
        // socket.on('DELETE_POST', function (msg) {
        //     handleGetPosts();
        // });

        // socket.on('ADD_POST', function (msg) {
        //     handleGetPosts();
        // });
    }, [handleGetPosts]);

    const handleDelete = (e) => {
        const id = e.target.dataset.id;
        API.delete(id)
            .then((response) => {
                //const filterPosts = posts.filter((post) => post.id !== id);
                //setPosts(filterPosts);
                //socket.emit('DELETE_POST');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className='content'>
            <Nav />

            <h1>Темы:</h1>
            <ul>
                {!!posts &&
                    posts.map((elem) => (
                        <article key={elem.id}>
                            <h2>
                                <Link to={`/post/${elem.id}`}>
                                    {elem.title}
                                </Link>
                            </h2>
                            <p>{elem.text}</p>
                            <div className='info'>
                                <span>
                                    {new Date(
                                        elem.createdAt
                                    ).toLocaleDateString()}
                                </span>
                                <span>{elem.author}</span>
                            </div>
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
                        </article>
                    ))}
            </ul>
        </div>
    );
}

export default Posts;

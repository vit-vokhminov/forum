import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from '../components';
import { API } from '../api';

function Posts() {
    const [posts, setPosts] = React.useState(null);

    React.useEffect(() => {
        API.getPosts().then((response) => {
            setPosts(response.data);
        });
    }, []);

    const handleDelete = (e) => {
        const id = e.target.dataset.id;
        API.delete(id)
        .then((response) => {
            const filterPosts = posts.filter(post => post._id !== id);
            setPosts(filterPosts);
        })
        .catch((error) => {
            console.log(error);
        });;
    }

    return (
        <div className='content'>
            <Nav />

            <h1>Темы:</h1>
            <ul>
                {!!posts &&
                    posts.map((elem) => (
                        <article key={elem._id}>
                            <h2>
                                <Link to={`/post/${elem._id}`}>
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
                            <button className='btn-delete' data-id={elem._id} onClick={handleDelete} title='Удалить'>
                                <i
                                    className='fas fa-trash-alt'
                                    data-id={elem._id}
                                ></i>
                            </button>
                        </article>
                    ))}
            </ul>
        </div>
    );
}

export default Posts;

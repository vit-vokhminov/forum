import React from 'react';
import { Nav, Topic, Comment, CommentAdd } from 'Components';
import { useParams, useHistory } from 'react-router-dom';

import { API } from 'Api';
import socket from 'Api/socket';

function Post() {
    const [post, setPost] = React.useState(null);
    const [messages, setMessages] = React.useState([]);
    const { id } = useParams();
    const history = useHistory();

    const handleAddMessages = React.useCallback(
        (value) => {
            API.addMessage(id, JSON.stringify(value))
                .then((response) => {
                    setMessages([...messages, response.data]);
                    socket.emit('NEW_MESSAGE');
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        [id, messages]
    );

    const handleGetMessages = React.useCallback(() => {
        API.getMessages(id).then((response) => {
            setMessages(response.data);
        });
    }, [id, setMessages]);

    React.useEffect(() => {
        API.getPost(id).then((response) => {
            setPost(response.data);
            handleGetMessages();
        });
        socket.on('NEW_MESSAGE', function (msg) {
            handleGetMessages();
        });
        socket.on('DELETE_POST', function (postId) {
            if (postId === id) {
                history.push('/posts');
            }
        });
        return () => {
            socket.off('NEW_MESSAGE');
            socket.off('DELETE_POST');
        };
    }, [id, handleGetMessages]);

    const handleDelete = () => {
        const conf = window.confirm(
            `Серьёзно? Ты хочешь удалить этот прекрасный пост?`
        );
        if (conf) {
            API.delete(id)
                .then((response) => {
                    socket.emit('DELETE_POST');
                    history.push('/posts');
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    return (
        <div className='content'>
            <Nav />

            <Topic post={post} handleDelete={handleDelete} />

            {
                <div className='messages'>
                    {messages.length ? (
                        messages.map((elem) => (
                            <Comment key={elem.id} message={elem} />
                        ))
                    ) : (
                        <p>Комментариев нет</p>
                    )}
                </div>
            }

            <CommentAdd handleAddMessages={handleAddMessages} />
        </div>
    );
}

export default Post;

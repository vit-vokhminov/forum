import React from 'react';
import { Nav, Topic, Comment, CommentAdd } from '../components';
import { API } from '../api';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
//import socket from '../api/socket';

function Post() {
    const [post, setPost] = React.useState(null);
    const [messages, setMessages] = React.useState([]);
    const linkId = useParams().id;
    const history = useHistory();

    const handleAddMessages = React.useCallback((value) => {
        console.log('value',value)
        API.addMessage(linkId, JSON.stringify(value))
            .then((response) => {
                setMessages([...messages, response.data]);
                //socket.emit('NEW_MESSAGE');
            })
            .catch((error) => {
                console.log(error);
            });
    },[linkId,messages]);

    const handleGetMessages = React.useCallback(() => {
            API.getMessages(linkId).then((response) => {
                setMessages(response.data);
            });

    },[linkId, setMessages]);

    React.useEffect(() => {
        API.getPost(linkId).then((response) => {
            setPost(response.data);
            handleGetMessages();
        });
        // socket.on('NEW_MESSAGE', function (msg) {
        //     handleGetMessages();
        // });
    }, [ linkId, handleGetMessages]);

    const handleDelete = () => {
        //const conf = confirm(`Are you sure?`);
        API.delete(linkId)
            .then((response) => {
                //socket.emit('DELETE_POST');
                history.push('/posts');
            })
            .catch((error) => {
                console.log(error);
            });
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

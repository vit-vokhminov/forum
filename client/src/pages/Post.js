import React from 'react';
import { Nav, Topic, Comment, CommentAdd } from '../components';
import { API } from '../api';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

function Post() {
    const [post, setPost] = React.useState(null);
    const linkId = useParams().id;
    const history = useHistory();

    React.useEffect(() => {
        API.getPost(linkId).then((response) => {
            setPost(response.data);
        });
    }, [linkId]);

    const handleDelete = () => {
        //const conf = confirm(`Are you sure?`);
        API.delete(linkId)
            .then((response) => {
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

            <div className='messages'>
                {!!post && post?.messages.length ? (
                    post.messages.map((elem) => (
                        <Comment key={elem._id} messages={elem} />
                    ))
                ) : (
                    <p>Комментариев нет</p>
                )}
            </div>

            <CommentAdd id={linkId} />
        </div>
    );
}

export default Post;

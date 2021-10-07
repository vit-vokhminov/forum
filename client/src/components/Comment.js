import React from 'react';
import { API } from '../api';
import { CommentAdd } from '../components';
import { useParams } from 'react-router-dom';

function Comment(props) {
    const { message } = props;
    const [answers, setAnswers] = React.useState([]);
    const [viewForn, setViewForn] = React.useState(false);
    const { id } = useParams();

    const handleAddMessagesToMessages = React.useCallback(
        (value) => {
            value.messageId = message.id;
            console.log(id, 'value', value);
            API.addMessageToMessage(id, JSON.stringify(value))
                .then((response) => {
                    setAnswers([...answers, response.data]);
                    setViewForn(!viewForn);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        [id, message, answers, viewForn]
    );

    React.useEffect(() => {
        API.getMessageToMessage(id, message.id)
            .then((response) => {
                setAnswers(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id, message]);

    return (
        <>
            <div className='message'>
                <div className='message_main'>
                    <div className='info'>
                        <span>{message.author || ''}</span>
                        <span>
                            {message.createdAt
                                ? new Date(message.createdAt).toLocaleDateString()
                                : 'Без даты'}
                        </span>
                    </div>
                    <p>{message.text}</p>
                    <div
                        className='message_answer'
                        onClick={() => setViewForn(!viewForn)}
                    >
                        Ответить
                    </div>
                </div>
                <div className='answers'>
                    <div className='answer-main'>
                        {!!answers.length &&
                            answers.map((elem, i) => (
                                <Comment key={i} message={elem} />
                            ))}
                    </div>
                    {viewForn && (
                        <CommentAdd
                            handleAddMessages={handleAddMessagesToMessages}
                        />
                    )}
                </div>
            </div>
        </>
    );
}

export default Comment;

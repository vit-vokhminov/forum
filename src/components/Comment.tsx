import React from 'react';
import { useParams } from 'react-router-dom';

import { API } from 'Api';
import { CommentAdd } from 'Components';
import { PropsCommentType, MessageType, IdParams } from 'Types/ForumTypes';
import { AddMessageValueType } from 'Types/ApiForumTypes';

function Comment(props: PropsCommentType) {
    const { message } = props;
    const [answers, setAnswers] = React.useState<MessageType[]>([]);
    const [viewForn, setViewForn] = React.useState<boolean>(false);
    const { id } = useParams<IdParams>();

    const handleAddMessagesToMessages = React.useCallback(
        (value: AddMessageValueType) => {
            value.messageId = message?.id;
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
                                ? new Date(
                                      message.createdAt
                                  ).toLocaleDateString()
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

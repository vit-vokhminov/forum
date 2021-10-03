import React from 'react';
import { CommentAdd } from '../components';
import { API } from '../api';

function Answer(props) {
    const { parentId, answer } = props;
    const [viewForn, setViewForn] = React.useState(false);
    const [answers, setAnswers] = React.useState([]);

    const handleAddMessagesToMessages = React.useCallback((value) => {
        value.messageId = answer.id;
        console.log('value',parentId, value)
        API.addMessageToMessage(parentId, JSON.stringify(value))
            .then((response) => {
                setAnswers([...answers, response.data]);
                setViewForn(!viewForn);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [parentId, answer, viewForn]);

    React.useEffect(() => {
        API.getMessageToMessage(parentId, JSON.stringify({
            messageId: answer.id
        }))
            .then((response) => {
                setAnswers(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [parentId, answer]);

    return (
        <>
            {/* <div className='answer'>
                <span>{answer.author}</span>
                <span>{answer.data}</span>
                <p>{answer.text}</p>
                <div
                    className='btn-answer'
                    onClick={() => setViewForn(!viewForn)}
                >
                    Ответить
                </div>
                <div className='answers'>
                    <div className='answer-main'>
                        {answers.length && answers.map((elem,i) => <Answer parentId={answer.id} answer={elem} key={i}/>)}
                    </div>
                    {viewForn && <CommentAdd handleAddMessages={handleAddMessagesToMessages} /> }
                </div>
            </div> */}


            <div className='message post'>
                <div className='message_main'>
                    <div className='info'>
                        <span>{answer.author || ''}</span>
                        <span>
                            {answer.createdAt
                                ? new Date(
                                    answer.createdAt
                                    ).toLocaleDateString()
                                : 'Без даты'}
                        </span>
                    </div>
                    <p>{answer.text}</p>
                    <div className='message_answer' onClick={() => setViewForn(!viewForn)}>Ответить</div>
                </div>
                <div className='answers'>
                    <div className='answer-main'>
                        {!!answers && answers.length && answers.map((elem,i) => <Answer parentId={answer.id} answer={elem} key={i}/>)}
                    </div>
                    {viewForn && <CommentAdd handleAddMessages={handleAddMessagesToMessages} /> }
                </div>
            </div>
        </>
    );
}

export default Answer;

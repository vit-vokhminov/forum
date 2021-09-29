import React from 'react';

function Comment(props) {
    const { messages } = props;

    return (
        <>
            {!!props && (
                <article className='message post'>
                    <div className='info'>
                        <span>{messages.author || ''}</span>
                        <span>
                            {
                                messages.createdAt
                                    ? new Date( messages.createdAt ).toLocaleDateString()
                                    : 'Без даты'
                            }
                        </span>
                    </div>
                    <p>{messages.text}</p>
                    {/* <div className='control'>
                        <button className='btn-edit' title='Редактировать'>
                            <i className='fas fa-edit'></i>
                        </button>
                        <button className='btn-delete' title='Удалить'>
                            <i className='fas fa-trash-alt'></i>
                        </button>
                    </div> */}
                </article>
            )}
        </>
    );
}

export default Comment;

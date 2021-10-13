import React from 'react';
import { useFormik, FormikProvider, Field, Form } from 'formik';
import * as Yup from 'yup';

function Comment(props) {
    const { handleAddMessages } = props;

    const formik = useFormik({
        initialValues: {
            author: 'testAuthor',
            text: '',
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            text: Yup.string()
                .min(3, 'Не менее 3 символов')
                .max(500, 'Не более 500 символов')
                .required('Не заполнен текст поста'),
        }),
        onSubmit: (value, { resetForm }) => {
            handleAddMessages(value);
            resetForm();
        },
    });

    return (
        <>
            <div className='message_form'>
                <FormikProvider value={formik}>
                    <Form>
                        <label>Комментарий</label>
                        <div className='form-text'>
                            <Field
                                as='textarea'
                                type='text'
                                name='text'
                            ></Field>
                            <div className='form-button'>
                                <button
                                    type='submit'
                                    disabled={!(formik.isValid && formik.dirty)}
                                >
                                    Отправить
                                </button>
                            </div>
                        </div>
                    </Form>
                </FormikProvider>
            </div>
        </>
    );
}

export default Comment;

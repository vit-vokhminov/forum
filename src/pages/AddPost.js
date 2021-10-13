import React from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik, FormikProvider, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Nav } from '../components';
import { API } from '../api';
import socket from '../api/socket';
import { useSelector } from 'react-redux';

function AddPost() {

    const user = useSelector((state) => state.userReducer.user);
    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            title: '',
            text: '',
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .min(3, 'Не менее 3 символов')
                .max(150, 'Не более 150 символов')
                .required('Не указан заголовок'),
            text: Yup.string()
                .min(3, 'Не менее 3 символов')
                .max(500, 'Не более 500 символов')
                .required('Не заполнен текст поста'),
        }),
        onSubmit: (values) => {
            //console.log('values', JSON.stringify(values, null, 2));
            values.author = user?.login;
            API.addPost(JSON.stringify(values))
                .then((response) => {
                    if (response.status === 200) {
                        socket.emit('ADD_POST');
                        history.push("/posts");
                    }
                })
                .catch((error) => {
                    throw new Error('Что-то пошло не так: ', error.message );
                });
        },
    });

    return (
        <div className='content'>
            <Nav />

            <FormikProvider value={formik}>
                <Form>
                    <div className='form-info'>
                        <label>
                            Заголовок
                            <Field type='text' id='title' name='title' />
                        </label>
                    </div>
                    <div className='form-text'>
                        <label>
                            Текст поста
                            <Field
                                as='textarea'
                                id='text'
                                type='text'
                                name='text'
                            ></Field>
                        </label>
                    </div>
                    <div className='form-button'>
                        <button
                            type='submit'
                            disabled={!(formik.isValid && formik.dirty)}
                        >
                            Сохранить
                        </button>
                    </div>
                </Form>
            </FormikProvider>
        </div>
    );
}

export default AddPost;

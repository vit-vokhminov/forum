import React from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik, FormikProvider, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Nav } from '../components';
import { API } from '../api';

function AddPost() {

    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            title: '',
            author: '',
            text: '',
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .min(3, 'Не менее 3 символов')
                .max(150, 'Не более 150 символов')
                .required('Не указан заголовок'),
            author: Yup.string()
                .min(3, 'Не менее 3 символов')
                .max(20, 'Не более 20 символов')
                .required('Не указан автор'),
            text: Yup.string()
                .min(3, 'Не менее 3 символов')
                .max(500, 'Не более 500 символов')
                .required('Не заполнен текст поста'),
        }),
        onSubmit: (values) => {
            //console.log('values', JSON.stringify(values, null, 2));

            API.addPost(JSON.stringify(values))
                .then((response) => {
                    if (response.status === 200) {
                        history.push("/posts");
                    }
                })
                .catch((error) => {
                    console.log(error);
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
                        <label>
                            Автор
                            <Field type='text' id='author' name='author' />
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

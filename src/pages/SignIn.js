import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik, FormikProvider, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { fetchLogin } from '../redux/store/userReducer';
import { Nav, IsLoading, ServerMessage } from '../components';
import { useHistory } from 'react-router-dom';

function SignIn() {
    const dispatch = useDispatch();
    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            email: 'text@email.ru',
            password: 'Qwerty123',
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Укажите почту')
                .required('Укажите почту'),
            password: Yup.string()
                .min(8, 'Не менее 8 символов')
                .required('Не менее 8 символов'),
        }),
        onSubmit: (values) => {
            dispatch(fetchLogin({ values, history }));
        },
    });

    return (
        <div className='content'>
            <Nav />

            <div className='sign'>
                <FormikProvider value={formik}>
                    <Form>
                        <div className='form_data'>
                            <label>
                                Почта
                                <Field type='email' name='email' />
                            </label>
                            <label>
                                Пароль
                                <Field type='password' name='password' />
                            </label>
                        </div>

                        <div className='form-button'>
                            <Link to='/signup'>Регистрация</Link>
                            <button type='submit' disabled={!formik.isValid}>
                                Войти
                            </button>
                        </div>
                    </Form>
                </FormikProvider>

                <IsLoading />
                <ServerMessage />
            </div>
        </div>
    );
}

export default SignIn;

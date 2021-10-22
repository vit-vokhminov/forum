import React from 'react';
import { Link, useHistory} from 'react-router-dom';
import { useFormik, FormikProvider, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

import { fetchRegistration } from '../redux/store/userReducer';
import { Loading, ServerMessage } from 'Components';

import { RouteComponentProps } from 'react-router-dom';

function SignUp() {
    const dispatch = useDispatch();
    const history = useHistory<RouteComponentProps['history']>();

    const formik = useFormik({
        initialValues: {
            email: 'text@email.ru',
            login: 'test-user',
            phone: '81234567891',
            password: 'Qwerty123',
            confirm: 'Qwerty123',
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Укажите почту')
                .required('Укажите почту'),
            login: Yup.string()
                .min(3, 'Не менее 3 символов')
                .max(20, 'Не более 20 символов')
                .required('Укажите логин'),
            phone: Yup.string().matches(
                /^(\s)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/,
                'Укажите телефон'
            ),
            password: Yup.string()
                .min(6, 'Не менее 6 символов')
                .required('Не менее 6 символов'),
            confirm: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Пароли не совпадают')
                .required('Пароли не совпадают'),
        }),
        onSubmit: (values) => {
            dispatch(fetchRegistration({ values, history }));
        },
    });

    return (
        <div className='content'>

            <div className='sign'>
                <FormikProvider value={formik}>
                    <Form>
                        <div className='form_data'>
                            <label>
                                Почта
                                <Field type='email' name='email' />
                            </label>
                            <label>
                                Логин
                                <Field type='text' name='login' />
                            </label>
                            <label>
                                Телефон
                                <Field type='tel' name='phone' />
                            </label>
                            <label>
                                Пароль
                                <Field type='password' name='password' />
                            </label>
                            <label>
                                Подтверждение пароля
                                <Field type='password' name='confirm' />
                            </label>
                        </div>
                        <div className='form-button'>
                            <Link to='/signin'>Войти</Link>
                            <button type='submit' disabled={!formik.isValid}>
                                Регистрация
                            </button>
                        </div>
                    </Form>
                </FormikProvider>

                <Loading />
                <ServerMessage />
            </div>
        </div>
    );
}

export default SignUp;

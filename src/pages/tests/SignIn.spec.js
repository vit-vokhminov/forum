import React from 'react';
import { waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { mockStore } from '../../../../mocks/store';
import { signinAction } from '../../../actions/auth/signin';

import Signin from '..';

jest.mock('../../../components/main', () => function Main({ children }) {
    return children;
});

jest.mock('react-router-dom', () => ({
    Link(props) {
        return <a {...props}>Регистрация</a>;
    },
    Redirect(props) {
        return <span {...props} />;
    },
}));

describe('<Signin />', () => {
    let store;
    let wrapper;

    beforeEach(async () => {
        store = mockStore({
            collections: {
                signin: {},
            },
        });

        wrapper = mount(
            <Provider store={store}>
                <Signin />
            </Provider>,
        );

        await waitFor(() => {
            wrapper.update();
        });
    });

    describe('редиректим на корневой роут, если', () => {
        it('успешно авторизовались', () => {
            store = mockStore({
                collections: {
                    signin: {
                        data: 'OK',
                    },
                },
            });

            wrapper = mount(
                <Provider store={store}>
                    <Signin />
                </Provider>,
            );

            expect(wrapper.find('Signin').find('Redirect')).toHaveLength(1);
            expect(wrapper.find('Signin').find('Redirect').props()).toEqual({
                to: '/',
            });
        });

        it('пользователь уже авторизован', () => {
            store = mockStore({
                collections: {
                    signin: {
                        error: 'User already in system',
                    },
                },
            });

            wrapper = mount(
                <Provider store={store}>
                    <Signin />
                </Provider>,
            );

            expect(wrapper.find('Signin').find('Redirect')).toHaveLength(1);
            expect(wrapper.find('Signin').find('Redirect').props()).toEqual({
                to: '/',
            });
        });
    });

    it('при сабмите формы диспатчим экшн для авторизации', async () => {
        wrapper.find('Signin').find('ReactFinalForm').props().onSubmit({
            login: 'admin',
            password: 'pass',
        });

        await waitFor(() => {
            expect(store.getActions()).toEqual([
                signinAction({
                    login: 'admin',
                    password: 'pass',
                }),
            ]);
        });
    });

    it('не рендерим сообщение об ошибке неправильного логина пароля, при загрузке страницы', async () => {
        await waitFor(() => {
            expect(wrapper.find({ children: 'Не правильный логин или пароль' })).toHaveLength(0);
        });
    });

    it('рендерим сообщение об ошибке, если пользователь ввел неправильный логин или пароль', async () => {
        store = mockStore({
            collections: {
                signin: {
                    error: 'Login or password is incorrect',
                },
            },
        });

        wrapper = mount(
            <Provider store={store}>
                <Signin />
            </Provider>,
        );

        await waitFor(() => {
            expect(wrapper.find({ children: 'Не правильный логин или пароль' })).toHaveLength(1);
        });
    });
});

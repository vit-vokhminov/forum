import { put, takeEvery, call } from 'redux-saga/effects';
import {
    LOGIN,
    REGISTRATION,
    LOGOUT,
    setUser,
    setUserAuth,
    setLoading,
    setServerMessage,
    CHECK_AUTH,
} from '../store/userReducer';
//import { push } from 'connected-react-router';
import { API_AUTH } from '../../api/auth';

function* fetchLogin(values) {
    yield put(setLoading(true));
    try {
        const response = yield call(API_AUTH.login, values.payload);
        if (response.status === 200) {
            yield localStorage.setItem('token', response.data.accessToken);
            yield put(setUser(response.data.user));
            yield put(setUserAuth(true));
            yield put(setLoading(false));
            //yield put(push('/'));
        }
    } catch (e) {
        yield put(setLoading(false));
        yield put(setServerMessage(e.response?.data?.message));
    }
}

function* fetchRegistration(values) {
    yield put(setLoading(true));
    try {
        const response = yield call(API_AUTH.registration, values.payload);
        console.log('response',response)
        if (response.status === 200) {
            yield localStorage.setItem('token', response.data.accessToken);
            yield put(setUser(response.data.user));
            yield put(setUserAuth(true));
            yield put(setLoading(false));
            //yield history.push("/");
            yield put(setServerMessage('На ваш email отправлено письмо для подтверждения почты'));

            yield new Promise((resolve) =>
                setTimeout(() => {
                    put(setServerMessage(''));
                    resolve();
                }, 3000)
            );
        }
    } catch (e) {console.log('ERROR')
        yield put(setLoading(false));
        yield put(setServerMessage(e.response?.data?.message));
    }
}

function* fetchLogout() {
    yield put(setLoading(true));
    try {
        const response = yield call(API_AUTH.logout);
        if (response.status === 200) {
            yield localStorage.removeItem('token');
            yield put(setUser(null));
            yield put(setUserAuth(false));
            yield put(setLoading(false));
        }
    } catch (e) {
        yield put(setLoading(false));
        yield put(setServerMessage(e.response?.data?.message));
    } finally {
        yield put(setLoading(false));
    }
}

function* fetchCheckAuth() {
    yield put(setLoading(true));
    try {
        const response = yield call(API_AUTH.checkAuth);
        console.log('function* fetchCheckAuth',response)
        if (response.status === 200) {
            yield localStorage.setItem('token', response.data.accessToken);
            yield put(setUser(response.data.user));
            yield put(setUserAuth(true));
        }
    } catch (e) {
        yield put(setServerMessage(e.response?.data?.message));
    } finally {
        yield put(setLoading(false));
    }
}

export function* userWatcher() {
    yield takeEvery(LOGIN, fetchLogin);
    yield takeEvery(REGISTRATION, fetchRegistration);
    yield takeEvery(LOGOUT, fetchLogout);
    yield takeEvery(CHECK_AUTH, fetchCheckAuth);
}

import type { TypeState, TypeUser, ActionType } from 'Types';

const defaultState: TypeState = {
    user: null,
    userAuth: false,
    isLoading: true,
    serverMessage: '',
};

export const SET_USER = 'SET_USER';
export const SET_USER_AUTH = 'SET_USER_AUTH';
export const LOGIN = 'LOGIN';
export const REGISTRATION = 'REGISTRATION';
export const LOGOUT = 'LOGOUT';
export const LOADING = 'LOADING';
export const SERVER_MESSAGE = 'SERVER_MESSAGE';
export const CHECK_AUTH = 'CHECK_AUTH';

export default function userReducer(
    state = defaultState,
    action: ActionType<TypeUser | boolean | string>
) {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: (action as ActionType<TypeUser>).payload };
        case SET_USER_AUTH:
            return { ...state, userAuth: (action as ActionType<boolean>).payload };
        case LOADING:
            return { ...state, isLoading: (action as ActionType<boolean>).payload };
        case SERVER_MESSAGE:
            return { ...state, serverMessage: (action as ActionType<boolean>).payload };
        default:
            break;
    }
    return state;
}

export const setUser = (payload: TypeUser) => ({ type: SET_USER, payload });
export const setUserAuth = (payload: boolean) => ({ type: SET_USER_AUTH, payload });
export const fetchLogin = (payload: void) => ({ type: LOGIN, payload });
export const fetchRegistration = (payload: void) => ({ type: REGISTRATION, payload });
export const fetchLogout = (payload: void) => ({ type: LOGOUT, payload });
export const setLoading = (payload: boolean) => ({ type: LOADING, payload });
export const setServerMessage = (payload: string) => ({
    type: SERVER_MESSAGE,
    payload,
});
export const fetchCheckAuth = (payload: void) => ({ type: CHECK_AUTH, payload });

const defaultState = {
    user: null,
    userAuth: false,
    isLoading: false,
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

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.payload };
        case SET_USER_AUTH:
            return { ...state, userAuth: action.payload };
        case LOADING:
            return { ...state, isLoading: action.payload };
        case SERVER_MESSAGE:
            return { ...state, serverMessage: action.payload };
        default:
            break;
    }
    return state;
}

export const setUser = (payload) => ({ type: SET_USER, payload });
export const setUserAuth = (payload) => ({ type: SET_USER_AUTH, payload });
export const fetchLogin = (payload) => ({ type: LOGIN, payload });
export const fetchRegistration = (payload) => ({ type: REGISTRATION, payload });
export const fetchLogout = () => ({ type: LOGOUT });
export const setLoading = (payload) => ({ type: LOADING, payload });
export const setServerMessage = (payload) => ({ type: SERVER_MESSAGE, payload });
export const fetchCheckAuth = (payload) => ({ type: CHECK_AUTH, payload });

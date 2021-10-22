import { RouteComponentProps } from 'react-router-dom';
import { TypeLogin, TypeRegistration } from 'Type/ApiAuthTypes';

export type TypeUser = {
    email: string,
    login: string
    phone: string
    isActivated: boolean
}
export type TypeState = {
    user: TypeUser | null,
    userAuth: boolean,
    isLoading: boolean,
    serverMessage: string,
}

export interface ActionType<T> {
    type: string;
    payload: T;
}

export type SignInPayloadType = {
    history: RouteComponentProps["history"],
    values: TypeLogin
}

export type SignUpPayloadType = {
    history: RouteComponentProps["history"],
    values: TypeRegistration
}



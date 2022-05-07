import axios, {AxiosResponse} from 'axios'
import {AuthStateType} from "../Bll/auth-reducer";

export const instance = axios.create({
    // baseURL: 'http://localhost:7542/2.0/',
    baseURL: `https://neko-back.herokuapp.com/2.0`,
    withCredentials: true,
})

export type editNameDataType = {
    name: string,
    avatar?: string // url or base64
}


export type ResponseEditNameType = {
    updatedUser: ResponseMeType, // все данные юзера
    error?: string
}

export type ResponseMeType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number; // количество колод

    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;

    error?: string;
}

export type ResponseDeleteType = {
    info: string,
    error: string;
}

export type LoginParamsType = {
    email: string,
    password: string,
    rememberMe: boolean,
}
export type ResponseType = any

// _id: string,
// email: string,
// name: string,
// avatar?: string,
// publicCardPacksCount: number;
// //кол-во колод
//
// created: Date;
// updated: Date;
// isAdmin: boolean;
// verified: boolean;//подтвердил ли почту
// rememberMe: boolean;
//
// error?: string;


// api
export const cardsAPI = {
    editName(data: editNameDataType) {
        return instance.put<ResponseEditNameType>('auth/me', data);
    },
    me() {
        return instance.post<ResponseMeType>('auth/me', {});
    },
    logout() {
        return instance.delete<ResponseDeleteType>(`auth/me`, {})
    },
    register(email: string, password: any) {
        instance.post('auth/register', {email, password})
    },
    login(data: LoginParamsType) {
        return instance.post<LoginParamsType, ResponseType>(`auth/login`, data)
    }
}

import axios from "axios";


export type LoginParamsType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha?: string,
}
export type ResponseType = {
    _id: string,
    email: string,
    name: string,
    avatar?: string,
    publicCardPacksCount: number;
    //кол-во колод

    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean;//подтвердил ли почту
    rememberMe: boolean;

    error?: string;
}

export const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const loginAPI = {
    login(data: LoginParamsType) {
        return instance.post<LoginParamsType, ResponseType>(`auth/login`, data)
    }
}
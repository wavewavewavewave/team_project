import axios, {AxiosResponse} from 'axios'
import {AuthStateType} from "../Bll/auth-reducer";

export const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export type editNameDataType = {
    name: string,
    avatar?: string // url or base64
}


export type ResponseEditNameType = {
    updatedUser: AuthStateType, // все данные юзера
    error?: string
}

// api
export const cardsAPI = {
    editName(data: editNameDataType) {
        return instance.put<ResponseEditNameType>('auth/me', data);
    },
}

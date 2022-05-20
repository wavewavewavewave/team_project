import axios, {AxiosResponse} from 'axios'
import {AuthStateType} from "../Bll/auth-reducer";
import {CardsType, initialPacksCardStateType} from "../PacksList/PackCard/packsCard-reducer";

export const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    // baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export type editNameDataType = {
    name: string,
    avatar?: string // url or base64
}

export type getPacksDataType = {
    packName: string, // не обязательно
    min: number, // не обязательно
    max: number, // не обязательно
    sortPacks: string, //"0updated" // не обязательно
    page: number, // не обязательно
    pageCount: number, // не обязательно
    user_id: string,  // чьи колоды не обязательно, или прийдут все
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


export type ForgotPasswordDataType = {
    email: string
    from: string
    message: string
}
export type NewPasswordDataType = {
    password: string
    resetPasswordToken: string
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
export type addPackDataType = {
    cardsPack: {
        name: string,
        deckCover: string, // не обязателен
        private: boolean, // если не отправить будет такой
    }
}

export type myPackNameEditDataType = {
    cardsPack: {
        _id: string,
        name: string,
    }
}

export type getPacksType = {
    // ?cardAnswer=english // не обязательно
    // &cardQuestion=english // не обязательно
    cardsPack_id: string
    // &min=1 // не обязательно
    // &max=4 // не обязательно
    // &sortCards=0grade // не обязательно
    // &page=1 // не обязательно
    // &pageCount=7
}
export type cardsPackResponseType = {
    cards:CardsType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    packUserId: string
    page: number
    pageCount: number
}



export type updatedGradeType = {
    _id: string
    cardsPack_id: string
    card_id: string
    user_id: string
    grade: number
    shots: number
}

// api
export const cardsAPI = {
    editName(data: editNameDataType) {
        return instance.put<ResponseEditNameType>('auth/me', data);
    },
    getPacks(params: getPacksDataType) {

        return instance.get<getPacksDataType, ResponseType>(`/cards/pack`, {params})
    },
    getCards(params: any) {
        return instance.get<cardsPackResponseType>(`/cards/card?cardsPack_id=${params.id}&page=${params.pageNumber}&pageCount=${params.pageCount}`)
    },
    addNewPack(params: addPackDataType) {

        return instance.post<getPacksDataType, ResponseType>(`/cards/pack`, params)
    },

    editNamePack(params: myPackNameEditDataType) {

        return instance.put<getPacksDataType, ResponseType>(`/cards/pack`, params)
    },
    deletePack(idNumber: string) {

        return instance.delete<getPacksDataType, ResponseType>(`/cards/pack/?id=${idNumber}`)
    },
    getCard(cardsPack_id: string, token: string) {
        return instance.get<initialPacksCardStateType>(`/cards/card?token=${token}&cardsPack_id=${cardsPack_id}`);
    },
    gradeCards(grade: number, card_id: string) {
        console.log(' "API" grade ', grade, 'card id', card_id)
        return instance.put<updatedGradeType>('/cards/grade', { grade, card_id })
    },

}



export const authAPI = {
    me() {
        return instance.post<ResponseMeType>('auth/me', {});
    },
    register(email: string, password: any) {
        return instance.post('auth/register', { email, password })
    },
    login(data: LoginParamsType) {
        return instance.post<LoginParamsType, ResponseType>(`auth/login`, data)
    },
    logout() {
        return instance.delete<ResponseDeleteType>(`auth/me`, {})
    },
    forgotPassword(email: string) {
        return instance.post<ForgotPasswordDataType>(`auth/forgot`,
            {
                email, from: 'ai73a@yandex.by',
                message: `<div style="background-color: lime; padding: 15px">
                password recovery link: 
                <a href='http://localhost:3000/#/set-new-password/$token$'>
                link</a>
                </div>`
            })
    },
    newPassword(password: string, resetPasswordToken: string) {
        return instance.post<NewPasswordDataType>(`auth/set-new-password`, {
            password,
            resetPasswordToken
        })
    },
}
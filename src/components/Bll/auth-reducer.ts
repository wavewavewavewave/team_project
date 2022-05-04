import {Dispatch} from "redux";
import {cardsAPI} from "../api/cards-api";
import {ThunkAction} from "redux-thunk";
import {AppRootReducerType} from "./store";
import {brotliDecompress} from "zlib";

export type AuthStateType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number | null;
// количество колод
    created: Date | null;
    updated: Date | null;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean | null;
    error?: string;

    isLogged: boolean;
}

export type ResponseEditNameType = {
    updatedUser: AuthStateType,
    error?: string
}

type ActionsType = EditNameActionType | ErrorActionType | LoggedActionType

const initialState: AuthStateType = {
    _id: "",
    email: "",
    name: "",
    avatar: "https://placepic.ru/wp-content/uploads/2021/02/7d5fe7bafa.jpg",
    publicCardPacksCount: 125,
// количество колод
    created: null,
    updated: null,
    isAdmin: false,
    verified: false, // подтвердил ли почту
    rememberMe: null,
    error: "",

    isLogged: true,
}

export type EditNameActionType = {
    type: "EDIT-NAME"
    payload: {
        name: string,
        avatar: string | undefined,
    }
}
export type ErrorActionType = {
    type: "ERROR"
    payload: {
        error: string,
    }
}
export type LoggedActionType = {
    type: "SET-LOGGED"
    payload: {
        isLogged: boolean,
    }
}

export const authReducer = (state: AuthStateType = initialState, action: ActionsType): AuthStateType => {
    switch (action.type) {
        case "EDIT-NAME":
        case "ERROR":
        case "SET-LOGGED":
            return {...state, ...action.payload}

        default:
            return state;
    }
}

export const editNameAC = (name: string, avatar: string | undefined): EditNameActionType => {
    return {
        type: "EDIT-NAME",
        payload: {
            name: name,
            avatar: avatar,
        }
    }
}

export const errorMessageAC = (error: string): ErrorActionType => {
    return {
        type: "ERROR",
        payload: {
            error
        }
    }
}

export const loggedAC = (isLogged: boolean): LoggedActionType => {
    return {
        type: "SET-LOGGED",
        payload: {
            isLogged
        }
    }
}

type ThunkType = ThunkAction<void, AppRootReducerType, unknown, ActionsType>

export const editNameTC = (name: string, avatar?: string | undefined): ThunkType => {

    return (dispatch: Dispatch<ActionsType>) => {
        // диспатчим крутилку
        //дизэблим кнопку
        cardsAPI.editName({name, avatar})
            .then((res) => {
                dispatch(editNameAC(res.data.updatedUser.name, res.data.updatedUser.avatar))
            })
            .catch((err) => {
                dispatch(errorMessageAC("some error"))
            })
            .finally(() => {
                //выключаем крутилку
                //раздизебливаем кнопку
            })
    }
}

export const LogoutTC = (): ThunkType => {

    return (dispatch: Dispatch<ActionsType>) => {
        // диспатчим крутилку
        //дизэблим кнопку
        cardsAPI.logout ()
            .then((res) => {
                dispatch(loggedAC(false))
            })
            .catch((err) => {
                dispatch(errorMessageAC("some error"))
            })
            .finally(() => {
                //выключаем крутилку
                //раздизебливаем кнопку
            })
    }
}

export const registerTC = (email: string, password: string) => async (dispatch: any) => {
    const res = await cardsAPI.register(email, password)
    console.log('erett', res)
}


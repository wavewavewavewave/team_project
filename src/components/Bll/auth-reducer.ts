import {Dispatch} from "redux";
import {cardsAPI} from "../api/cards-api";
import {AxiosResponse} from "axios";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppRootReducerType} from "../../store";

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
}

export type ResponseEditNameType = {
    updatedUser: AuthStateType,
    error?: string
}

type ActionsType = EditNameActionType | ErrorActionType

const initialState: AuthStateType = {
    _id: "",
    email: "",
    name: "Roman",
    avatar: "https://placepic.ru/wp-content/uploads/2021/02/7d5fe7bafa.jpg",
    publicCardPacksCount: 125,
// количество колод
    created: null,
    updated: null,
    isAdmin: false,
    verified: false, // подтвердил ли почту
    rememberMe: null,
    error: "",
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

export const authReducer = (state: AuthStateType = initialState, action: ActionsType): AuthStateType => {
    switch (action.type) {
        case "EDIT-NAME":
        case "ERROR":
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

type ThunkType = ThunkAction<void, AppRootReducerType, unknown, ActionsType>

export const editNameTC = (name: string, avatar?: string | undefined): ThunkType => {

    return (dispatch: Dispatch<ActionsType>) => {
        // диспатчим крутилку
        cardsAPI.editName({name, avatar})
            .then((res) => {
                dispatch(editNameAC(res.data.updatedUser.name, res.data.updatedUser.avatar))
                //выключаем крутилку
            })
            .catch((err) => {
              dispatch(errorMessageAC("some error"))
            })
            .finally(() => {
                //выключаем крутилку
            })
    }
}
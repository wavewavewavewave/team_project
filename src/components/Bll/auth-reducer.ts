import {Dispatch} from "redux";
import {cardsAPI, ResponseMeType} from "../api/cards-api";
import {ThunkAction} from "redux-thunk";
import {AppRootReducerType} from "./store";


export type AuthStateType = {
    isDisabledSaveButton: boolean,
    isDisabledLogoutButton: boolean,

    error: string,
    isLogged: boolean

}

export type ResponseEditNameType = {
    updatedUser: AuthStateType,
    error?: string
}

type ActionsType = ErrorActionType | LoggedActionType | changeStatusSaveButtonActionType | changeStatusLogoutButtonActionType

const initialState: AuthStateType = {
    isDisabledSaveButton: false,
    isDisabledLogoutButton: false,

    error: "",
    isLogged: false
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
        // case "EDIT-NAME":
        case "PROFILE/SET-STATUS-SAVE-BUTTON":
        case "PROFILE/SET-STATUS-LOGOUT-BUTTON":
        case "ERROR":
        case "SET-LOGGED":
            return {...state, ...action.payload}

        default:
            return state;
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

export type changeStatusSaveButtonActionType = {
    type: "PROFILE/SET-STATUS-SAVE-BUTTON",
    payload: {
        isDisabledSaveButton: boolean
    }
}
export const changeStatusSaveButtonAC = (status: boolean): changeStatusSaveButtonActionType => {
    return {
        type: "PROFILE/SET-STATUS-SAVE-BUTTON",
        payload: {
            isDisabledSaveButton: status
        }
    }
}
export type changeStatusLogoutButtonActionType = {
    type: "PROFILE/SET-STATUS-LOGOUT-BUTTON",
    payload: {
        isDisabledSaveButton: boolean
    }
}
export const changeStatusLogoutButtonAC = (status: boolean): changeStatusLogoutButtonActionType => {
    return {
        type: "PROFILE/SET-STATUS-LOGOUT-BUTTON",
        payload: {
            isDisabledSaveButton: status
        }
    }
}

type ThunkType = ThunkAction<void, AppRootReducerType, unknown, ActionsType>


export const LogoutTC = (): ThunkType => {

    return (dispatch: Dispatch<ActionsType>) => {
        // диспатчим крутилку
       dispatch(changeStatusLogoutButtonAC(true))
        cardsAPI.logout ()
            .then((res) => {
                dispatch(loggedAC(false))
            })
            .catch((err) => {
                dispatch(errorMessageAC("some error"))
            })
            .finally(() => {
                //выключаем крутилку
                dispatch(changeStatusLogoutButtonAC(false))
            })
    }
}

// export const registerTC = (email: string, password: string) => async (dispatch: any) => {
//     const res = await cardsAPI.register(email, password)
//     console.log('erett', res)
// }

export const registerTC= (email: any, password: any) => (dispatch: any) => {
    cardsAPI.register(email, password)
        .then(res => {
            dispatch(loggedAC(true))
        })
        .catch(err => {
            dispatch(errorMessageAC(err.response.data.error))
        })
}


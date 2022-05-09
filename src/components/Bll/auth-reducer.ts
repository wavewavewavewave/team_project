import { Dispatch } from "redux";
import { authAPI, cardsAPI, ResponseMeType } from "../api/cards-api";
import { ThunkAction } from "redux-thunk";
import { AppRootReducerType } from "./store";
import { NavigateFunction } from "react-router-dom";


export type AuthStateType = {
    isDisabledSaveButton: boolean,
    isDisabledLogoutButton: boolean,

    error: string | null,
    isLogged: boolean

}

export type ResponseEditNameType = {
    updatedUser: AuthStateType,
    error?: string
}

type ActionsType = 
ErrorActionType 
| LoggedActionType 
| changeStatusSaveButtonActionType 
| changeStatusLogoutButtonActionType
| SetEmailAddresUserACType

const initialState: AuthStateType = {
    isDisabledSaveButton: false,
    isDisabledLogoutButton: false,

    error: "",
    isLogged: false
}

export type ErrorActionType = {
    type: "ERROR"
    payload: {
        error: string | null,
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
        case "AUTH/EMAIL-ADD-USER":
        case "ERROR":
        case "SET-LOGGED": 
            return { ...state, ...action.payload }
        default:
            return state;
    }
}


export const errorMessageAC = (error: string | null): ErrorActionType => {
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
        isDisabledLogoutButton: boolean
    }
}
export const changeStatusLogoutButtonAC = (status: boolean): changeStatusLogoutButtonActionType => {
    return {
        type: "PROFILE/SET-STATUS-LOGOUT-BUTTON",
        payload: {
            isDisabledLogoutButton: status
        }
    }
}

export type SetEmailAddresUserACType = ReturnType<typeof setEmailAddresUserAC>
export const setEmailAddresUserAC = (email: string) => ({
    type: 'AUTH/EMAIL-ADD-USER',
    payload: {
        email
    }
} as const)



export const LogoutTC = (): ThunkType => {

    return (dispatch: Dispatch<ActionsType>) => {
        // диспатчим крутилку
        dispatch(changeStatusLogoutButtonAC(true))
        authAPI.logout()
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


export const register = (email: string, password: string): ThunkType => (dispatch) => {
    authAPI.register(email, password)
        .then(res => {
            dispatch(loggedAC(true))
        })
        .catch(err => {
            if(err.response.data.passwordRegExp) {
                dispatch(errorMessageAC(err.response.data.passwordRegExp))
            } else {
                dispatch(errorMessageAC(err.response.data.error))
            }
        })
}


export const forgot = (email: string, navigate: NavigateFunction) => (dispatch: Dispatch) => {
    authAPI.forgot(email)
        .then(res => {
            dispatch(setEmailAddresUserAC(email))

            navigate('/checkEmail');
            setTimeout(() => {
                navigate('/login')
            }, 5000);
        })
        .catch(err => {
            if(err.response.data.passwordRegExp) {
                dispatch(errorMessageAC(err.response.data.passwordRegExp))
            } else {
                dispatch(errorMessageAC(err.response.data.error))
            }
        })
}




export const setNewPassword = (password: string, resetPasswordToken: string): ThunkType => (dispatch) => {
   console.log(password, resetPasswordToken)
    authAPI.setNewPassword(password, resetPasswordToken)
        .then(res => {
            // dispatch(loggedAC(true))
        })
        .catch(err => {
            if(err.response.data.passwordRegExp) {
                dispatch(errorMessageAC(err.response.data.passwordRegExp))
            } else {
                dispatch(errorMessageAC(err.response.data.error))
            }
        })
}


type ThunkType = ThunkAction<void, AppRootReducerType, unknown, ActionsType>


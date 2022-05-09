import {Simulate} from "react-dom/test-utils";
import {Dispatch} from "redux";
import {cardsAPI, LoginParamsType} from "../api/cards-api";
import {ThunkAction} from "redux-thunk";
import {AppRootReducerType} from "../Bll/store";
import {
    changeStatusSaveButtonAC,
    changeStatusSaveButtonActionType,
    ErrorActionType,
    errorMessageAC, loggedAC, LoggedActionType
} from "../Bll/auth-reducer";

const initialState: AuthStateType = {
    _id: "5eb543f6bea3ad21480f1ee7",
    email: "Some e-mail",
    name: "Some name",
    avatar: "https://placepic.ru/wp-content/uploads/2021/02/7d5fe7bafa.jpg",
    publicCardPacksCount: "is unknown",
// количество колод
    created: null,
    updated: null,
    isAdmin: false,
    verified: false, // подтвердил ли почту
    rememberMe: null,
    error: "",

    // isLogged: true,
}
export type AuthStateType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number | null | string;
// количество колод
    created: Date | null;
    updated: Date | null;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean | null;
    error?: string;

    // isLogged: boolean;
}
// type InitialStateType = UserType

export const LoginReducer = (state: AuthStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'login/USER-LOGIN':
            return {...state, ...action.user}
        case "EDIT-NAME":
            return {...state, ...action.payload}
        case "SET-USER":
            return {...state, ...action.data}
        default:
            return state
    }
}

export type UserLoginACType = ReturnType<typeof userLoginAC>
export const userLoginAC = (user: AuthStateType) => ({
        type: 'login/USER-LOGIN',
        user,
    } as const
)

export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
    //krutilka
    cardsAPI.login(data)
        .then(res => {
            // dispatch(setIsLoggedInAC(true))
            dispatch(userLoginAC(res.data))
            dispatch(loggedAC(true))
            //wikluchaem krutilku
        })
        .catch(e => {
            const error = e.response ? e.response.data.error : (e.message +
                ',more details in console')
            console.log('Error: ', {...e})
        })
}

export type EditNameActionType = {
    type: "EDIT-NAME"
    payload: {
        name: string,
        avatar: string | undefined,
    }
}

export type SetUserActionType = {
    type: "SET-USER",
    data: any
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
export const setUserAC = (data: any): SetUserActionType => {
    return {
        type: "SET-USER",
        data
    }
}

type ThunkType = ThunkAction<void, AppRootReducerType, unknown, ActionsType>

export const editNameTC = (name: string, avatar?: string | undefined): ThunkType => {

    return (dispatch: Dispatch<ActionsType>) => {
        // диспатчим крутилку
        dispatch(changeStatusSaveButtonAC(true))
        cardsAPI.editName({name, avatar})
            .then((res) => {
                debugger
                dispatch(editNameAC(res.data.updatedUser.name, res.data.updatedUser.avatar))
            })
            .catch((err) => {
                dispatch(errorMessageAC("some error"))
            })
            .finally(() => {
                //выключаем крутилку
                dispatch(changeStatusSaveButtonAC(false))
            })
    }
}

type ActionsType = UserLoginACType | EditNameActionType | ErrorActionType | SetUserActionType | changeStatusSaveButtonActionType | LoggedActionType
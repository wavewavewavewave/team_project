import {loginAPI, LoginParamsType} from "./LoginAPI";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {Dispatch} from "redux";

export const initialState = {
    isLoggedIn: false,
    user: null
}

type UserType = {
    _id: string,
    email: string,
    name: string,
    avatar?: string,
    publicCardPacksCount: number,

    created: Date,
    updated: Date,
    isAdmin: boolean,
    verified: boolean,//подтвердил ли почту
    rememberMe: boolean,

    error?: string,
}
type InitialStateType = typeof initialState

export const LoginReducer = (state: InitialStateType, action: ActionsType) => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        case 'login/USER-LOGIN':
            return {...state, user: action.user}
        default:
            return state
    }
}

export type SetIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>
export const setIsLoggedInAC = (value: boolean) => ({
        type: 'login/SET-IS-LOGGED-IN',
        value,
    } as const
)

export type UserLoginACType = ReturnType<typeof userLoginAC>
export const userLoginAC = (user: UserType) => ({
        type: 'login/USER-LOGIN',
        user,
    } as const
)

export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
    //krutilka
    loginAPI.login(data)
        .then(res => {
            dispatch(setIsLoggedInAC(true))
            dispatch(userLoginAC(res))
            //wikluchaem krutilku
        })
       .catch(e => {
        const error = e.response ? e.response.data.error : (e.message +
            ',more details in console')
        console.log('Error: ', {...e})
    })
}


type ActionsType = SetIsLoggedInACType | UserLoginACType
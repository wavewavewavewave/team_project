import {Simulate} from "react-dom/test-utils";
import {Dispatch} from "redux";
import {cardsAPI, LoginParamsType} from "../api/cards-api";

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

    // isLogged: true,
}
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

    // isLogged: boolean;
}
// type InitialStateType = UserType

export const LoginReducer = (state: AuthStateType = initialState , action: ActionsType) => {
    switch (action.type) {
        case 'login/USER-LOGIN':
            return {...state, ...action.user}
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
            debugger
            // dispatch(setIsLoggedInAC(true))
            dispatch(userLoginAC(res.data))
            //wikluchaem krutilku
        })
       .catch(e => {
        const error = e.response ? e.response.data.error : (e.message +
            ',more details in console')
        console.log('Error: ', {...e})
    })
}


type ActionsType =  UserLoginACType
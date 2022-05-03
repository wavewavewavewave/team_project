export const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const LoginReducer = (state: InitialStateType, action: ActionsType) => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
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


type ActionsType = SetIsLoggedInACType
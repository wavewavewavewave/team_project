

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
    rememberMe: boolean  | null;
    error?: string;
}

type ActionsType = {}

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
    name: string,
    avatar: string
}

export const authReducer = (state: AuthStateType = initialState, action: EditNameActionType): AuthStateType => {
    switch (action.type) {
        case "EDIT-NAME":
            return {...state, name: action.name}

        default:
            return state;
    }}
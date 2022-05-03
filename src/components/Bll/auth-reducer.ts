import { Dispatch } from "redux"
import { authAPI } from "../Registration/api"


const initialState = {}



export const authReducer = (state = initialState, action: any) => {
    switch (action.type) {

        default:
            return state
    }
}



export const registerTC = (email: string, password: string) => async (dispatch: any) => {
        const res = await authAPI.register(email, password)
        console.log('erett', res)
    }








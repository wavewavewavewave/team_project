import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk'
import {authReducer} from "./auth-reducer";
import {profileReducer} from "./profile-reducer";
import {LoginReducer} from "../Login/login-reducer";


const rootReducer = combineReducers({
    auth: authReducer,
    login: LoginReducer,
})


export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppRootReducerType = ReturnType<typeof rootReducer>


//@ts-ignore
window.store = store;
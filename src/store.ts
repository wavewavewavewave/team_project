import { useDispatch } from "react-redux";
import {applyMiddleware, combineReducers} from "redux";
import { legacy_createStore as createStore} from 'redux'

import thunkMiddleware from 'redux-thunk'
import {authReducer} from "./components/Bll/auth-reducer";
import {profileReducer} from "./components/Bll/profile-reducer";
export type TypedDispatch = typeof store.dispatch;
export const useTypedDispatch = () => useDispatch<TypedDispatch>();


const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,

})


export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppRootReducerType = ReturnType<typeof rootReducer>


//@ts-ignore
window.store = store;
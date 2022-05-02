import {applyMiddleware, combineReducers} from "redux";
import thunkMiddleware from 'redux-thunk'
import {authReducer} from "./components/Bll/auth-reducer";
import {profileReducer} from "./components/Bll/profile-reducer";
import { legacy_createStore as createStore} from 'redux'


const rootReducer = combineReducers({
    auth: authReducer,
    // profile: profileReducer,

})


export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppRootReducerType = ReturnType<typeof rootReducer>


//@ts-ignore
window.store = store;
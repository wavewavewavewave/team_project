import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk'


const rootReducer = combineReducers({

})


export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppRootReducerType = ReturnType<typeof rootReducer>


//@ts-ignore
window.store = store;
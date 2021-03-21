import { combineReducers } from "redux";
import { all, fork } from "redux-saga/effects";
import {registerReducer,watchRegister}from './register'
import {loginReducer,watchLogin}from './login'
export const rootReducer=combineReducers({
    registerReducer,
    loginReducer
})
export function* rootSaga(){
    yield all([
        fork(watchRegister),
        fork(watchLogin)
    ])
}
export type RootState = ReturnType<typeof rootReducer>;


import { combineReducers } from "redux";
import { all, fork } from "redux-saga/effects";
import {registerReducer,watchRegister}from './register'
import {loginReducer,watchLogin}from './login'
import {userDataReducer,watchUserData}from './userData'

export const rootReducer=combineReducers({
    registerReducer,
    loginReducer,
    userDataReducer,
})
export function* rootSaga(){
    yield all([
        fork(watchRegister),
        fork(watchLogin),
        fork(watchUserData),
    ])
}
export type RootState = ReturnType<typeof rootReducer>;


import { combineReducers } from "redux";
import { all, fork } from "redux-saga/effects";
import {registerReducer,watchRegister}from './register'
import {loginReducer,watchLogin}from './login'
import {userDataReducer,watchUserData}from './userData'
import {writeReducer,watchWrite}from './post'
export const rootReducer=combineReducers({
    registerReducer,
    loginReducer,
    userDataReducer,
    writeReducer
})
export function* rootSaga(){
    yield all([
        fork(watchRegister),
        fork(watchLogin),
        fork(watchUserData),
        fork(watchWrite)
    ])
}
export type RootState = ReturnType<typeof rootReducer>;


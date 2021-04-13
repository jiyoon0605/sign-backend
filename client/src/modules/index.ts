import { combineReducers } from "redux";
import { all, fork } from "redux-saga/effects";
import {registerReducer,watchRegister}from "./register"
import {loginReducer,watchLogin}from "./login"
import {writeReducer,watchWrite}from "./write"
import {postReducer,watchPost} from "./post"
import {userDataReducer,watchUserData} from "./userData"
import  {mypageReducer,watchMypage} from "./mypage";
export const rootReducer=combineReducers({
    registerReducer,
    loginReducer,
    writeReducer,
    postReducer,
    userDataReducer,
    mypageReducer
})
export function* rootSaga(){
    yield all([
        fork(watchRegister),
        fork(watchLogin),
        fork(watchWrite),
        fork(watchPost),
        fork(watchUserData),
        fork(watchMypage)
    ])
}
export type RootState = ReturnType<typeof rootReducer>;


import { combineReducers } from "redux";
import { all, fork } from "redux-saga/effects";
import {registerReducer,watchRegister}from './register'

export const rootReducer=combineReducers({
    registerReducer
})
export function* rootSaga(){
    yield all([
        fork(watchRegister)
    ])
}
export type RootState = ReturnType<typeof rootReducer>;


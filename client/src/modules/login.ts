import { createAction,  PayloadAction } from "@reduxjs/toolkit";
import {  call,  put, takeLatest } from "redux-saga/effects";
import axios from 'axios';

type State="init"|"request"|"access";



interface LoginState{
    result?:"request",
    email:string,
    password:string
};


const LOGIN_REQUEST="LOGIN_REQUEST";
const LOGIN_SUCCESS="LOGIN_SUCCESS";
const LOG_OUT="LOG_OUT";

export const loginRequest=createAction<LoginState>(LOGIN_REQUEST);
const loginSuccess=createAction(LOGIN_SUCCESS);
export const logoutRequest=createAction(LOG_OUT);

type LoginActionType=PayloadAction<LoginState>|PayloadAction<State>;


const loginReducer=(state:State="init",action:LoginActionType):State=>{
    switch(action.type){
        case LOGIN_REQUEST:
            return "request";
        case LOGIN_SUCCESS:
            return "access"
        case LOG_OUT:
            localStorage.removeItem("accessToken");
            return "init"
        default:
            return state;
    }
}


function* request(action:LoginActionType){
    console.log("request");
    try{
        const client=axios.create({
         //   baseURL:"https://dsm-sign.herokuapp.com",
        });
        const {data} = yield call([client,"post"],"/auth/login",action.payload);
         yield put(loginSuccess());     
         localStorage.setItem("accessToken",data.token);
    }
    catch(err){
        alert(err.response.data.error);
    }
}

function* watchLogin(){
    yield takeLatest(LOGIN_REQUEST,request);
}

export {loginReducer,watchLogin};
import { createAction,  PayloadAction } from "@reduxjs/toolkit";
import {  call,  put, takeLatest } from "redux-saga/effects";
import axios from 'axios';

interface LoginState{
    result?:"pendding",
    email:string,
    password:string
};

interface LoginSuccess{
    result:"success",
};


interface LogOut{
    result:"logout"
}

type LoginType=LoginState|LoginSuccess|LogOut;

const LOGIN_REQUEST="LOGIN_REQUEST";
const LOGIN_SUCCESS="LOGIN_SUCCESS";
const LOG_OUT="LOG_OUT";

export const loginRequest=createAction<LoginState>(LOGIN_REQUEST);
const loginSuccess=createAction<LoginSuccess>(LOGIN_SUCCESS);
export const logoutRequest=createAction<LogOut>(LOG_OUT);

type LoginActionType=PayloadAction<LoginState>|PayloadAction<LoginSuccess>|PayloadAction<LogOut>;

const loginReducer=(state:LoginType={
    email:"",
    password:""
},action:LoginActionType)=>{
    switch(action.type){
        case LOGIN_REQUEST:
        case LOGIN_SUCCESS:
            return action.payload;
        case LOG_OUT:
            return{
                email:"",
                password:""
            }
        default:
            return state;
    }
}


function* request(action:LoginActionType){
    try{
        const {data} = yield call([axios,"post"],"/auth/login",action.payload);
         yield put(loginSuccess({
             result:"success"
         }));     
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
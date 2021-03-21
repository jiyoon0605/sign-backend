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
interface LoginFail{
    result:"fail",
    reason:string|Error|Object
};

type LoginType=LoginState|LoginSuccess|LoginFail;

const LOGIN_REQUEST="LOGIN_REQUEST";
const LOGIN_SUCCESS="LOGIN_SUCCESS";
const LOGIN_FAIL="LOGIN_FAIL";

export const loginRequest=createAction<LoginState>(LOGIN_REQUEST);
const loginSuccess=createAction<LoginSuccess>(LOGIN_SUCCESS);
const loginFail=createAction<LoginFail>(LOGIN_FAIL);

type LoginActionType=PayloadAction<LoginState>|PayloadAction<LoginSuccess>|PayloadAction<LoginFail>;

const loginReducer=(state:LoginType={
    email:"",
    password:""
},action:LoginActionType)=>{
    switch(action.type){
        case LOGIN_REQUEST:
            return action.payload;
        case LOGIN_SUCCESS:
            return action.payload;
        case LOGIN_FAIL:
            return action.payload;
        default:
            return state;
    }
}


function* request(action:LoginActionType){
    try{
        const {data}= yield call([axios,"post"],"/auth/login",action.payload);
         yield put(loginSuccess({
             result:"success"
         }));
         localStorage.setItem("accessToken",data.token);
    }
    catch(err){
        yield put(loginFail({
            result:"fail",
            reason:err.response.data.error
        }));
    }
}

function* watchLogin(){
    yield takeLatest(LOGIN_REQUEST,request);
}

export {loginReducer,watchLogin};
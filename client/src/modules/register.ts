import { createAction,  PayloadAction } from "@reduxjs/toolkit";
import {  call,  put, takeLatest } from "redux-saga/effects";
import axios from 'axios';
interface RegisterState{
    result?:"pending",
    email:string,
    name:string,
    password:string
};
interface RegisterSuccess{
    result:"success",
};
interface RegisterFail{
    result:"fail",
    reason:string|Error
};

type RegisterType=RegisterSuccess|RegisterFail|RegisterState;

const REGISTER_REQUEST="REGISTER_REQUEST";
const REGISTER_SUCCESS="REGISTER_SUCCESS";
const REGISTER_FAILUER="REGISTER_FAILUER";

export const registerRequest=createAction<RegisterState>(REGISTER_REQUEST);
const registerSuccess=createAction<RegisterSuccess>(REGISTER_SUCCESS);
const registerFail=createAction<RegisterFail>(REGISTER_FAILUER);

type RegisterActionTypes=PayloadAction<RegisterState>|PayloadAction<RegisterSuccess>|PayloadAction<RegisterFail>;

const registerReducer=(state:RegisterType={
    result:"pending",
    email:"",
    name:"",
    password:""
},action:RegisterActionTypes)=>{
    switch(action.type){
        case REGISTER_REQUEST:
            return action.payload;
        case REGISTER_SUCCESS:
            return action.payload;
        case REGISTER_FAILUER:
            return action.payload;
        default:
            return state;
    }
}



function* request(action:RegisterActionTypes){
    const data=action.payload;
    try{
        yield call([axios,"post"],"/auth/register",data);
        yield put(registerSuccess({
            result:"success",
        }))
    }
    catch(err){
        yield put(registerFail({
            result:"fail",
            reason:err.response.data.fail
        }))
    }
}

function* watchRegister(){
    yield takeLatest(REGISTER_REQUEST,request);
}


export {registerReducer,watchRegister};
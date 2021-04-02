import { createAction,  PayloadAction } from "@reduxjs/toolkit";
import {  call,  put, takeLatest } from "redux-saga/effects";
import getRequest from 'api';

type State="init"|"request"|"complate";

interface RegisterState{
    result?:"request",
    email:string,
    name:string,
    password:string
};

const REGISTER_REQUEST="REGISTER_REQUEST";
const REGISTER_SUCCESS="REGISTER_SUCCESS";
const REGISTER_COMPLATE="REGISTER_COMPLATE";

export const registerRequest=createAction<RegisterState>(REGISTER_REQUEST);
export const registerComplate=createAction(REGISTER_COMPLATE);
const registerSuccess=createAction(REGISTER_SUCCESS);


type RegisterActionTypes=PayloadAction<RegisterState>|PayloadAction<State>;

const registerReducer=(state:State="init",action:RegisterActionTypes):State=>{
    switch(action.type){
        case REGISTER_REQUEST:
            return "request";
        case REGISTER_SUCCESS:
            return "complate";
        case REGISTER_COMPLATE:
            return "init";
        default:
            return state;
    }
}



function* request(action:RegisterActionTypes){
    const data=action.payload;
    try{
        yield call([getRequest(),"post"],"/auth/register",data);
        yield put(registerSuccess());
    }
    catch(err){
        alert(err.response.data.fail)
    }
}

function* watchRegister(){
    yield takeLatest(REGISTER_REQUEST,request);
}


export {registerReducer,watchRegister};
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
interface RegisterComplete{
     result:"complate",
}
type RegisterType=RegisterSuccess|RegisterState|RegisterComplete;

const REGISTER_REQUEST="REGISTER_REQUEST";
const REGISTER_SUCCESS="REGISTER_SUCCESS";
const REGISTER_COMPLATE="REGISTER_COMPLATE";

export const registerRequest=createAction<RegisterState>(REGISTER_REQUEST);
export const registerComplate=createAction(REGISTER_COMPLATE);
const registerSuccess=createAction<RegisterSuccess>(REGISTER_SUCCESS);


type RegisterActionTypes=PayloadAction<RegisterState>|PayloadAction<RegisterSuccess>|PayloadAction<RegisterComplete>;

const registerReducer=(state:RegisterType={
    result:"pending",
    email:"",
    name:"",
    password:""
},action:RegisterActionTypes)=>{
    switch(action.type){
        case REGISTER_REQUEST:
        case REGISTER_SUCCESS:
        case REGISTER_COMPLATE:
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
        alert(err.response.data.fail)
    }
}

function* watchRegister(){
    yield takeLatest(REGISTER_REQUEST,request);
}


export {registerReducer,watchRegister};
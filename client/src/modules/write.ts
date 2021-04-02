import { createAction,  PayloadAction } from "@reduxjs/toolkit";
import clinet from 'api';
import {  call,  put, takeLatest } from "redux-saga/effects";

type State="init"|"request"|"complate";

interface FormDataType{
    result?:"request",
    data:FormData
}


const WRITE_REQUEST="WRITE_REQUEST";
const WRITE_SUCCESS="WRITE_SUCCESS";
const WRITE_COMPLATE="WRITE_COMPLATE";

export const writeRequest=createAction<FormDataType>(WRITE_REQUEST);
const writeSuccess=createAction(WRITE_SUCCESS);
export const writeComplate=createAction(WRITE_COMPLATE)

type WriteActionType=PayloadAction<FormDataType>

const writeReducer=(state:State="init",action:WriteActionType):State=>{
    switch(action.type){
        case WRITE_SUCCESS:
            return "complate"
        case WRITE_COMPLATE:
            return "init"
        default:
            return state;
    }

}


function* request(action:PayloadAction<FormDataType>){
    const userData=action.payload;
    console.log(userData.data);
    try{
        yield call([clinet(),"post"],"/post/upload",userData.data);
        yield put(writeSuccess())
    }catch(e){
        alert("게시물이 등록되지 않았습니다.")
    }
}

function* watchWrite(){
    yield takeLatest(WRITE_REQUEST,request);
}

export {writeReducer,watchWrite}
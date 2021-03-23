import { createAction,  PayloadAction } from "@reduxjs/toolkit";
import clinet from 'api';
import {  call,  put, takeLatest } from "redux-saga/effects";


interface FormDataType{
    result?:"pending",
    data:FormData
}

interface WriteSuccess{
    result:"success",
};

interface WriteFail{
    result:"fail"
    reason:string|Error
};

type WriteType=FormDataType|WriteSuccess|WriteFail;

const WRITE_REQUEST="WRITE_REQUEST";
const WRITE_SUCCESS="WRITE_SUCCESS";
const WRITE_FAIL="WRITE_FAIL";

export const writeRequest=createAction<FormDataType>(WRITE_REQUEST);
const writeSuccess=createAction<WriteSuccess>(WRITE_SUCCESS);
const wrtieFail=createAction<WriteFail>(WRITE_FAIL);

type WriteActionType=PayloadAction<FormDataType>|PayloadAction<WriteSuccess>|PayloadAction<WriteFail>;

const writeReducer=(state:WriteType={result:"pending", data:new FormData()},action:WriteActionType):WriteType=>{
    switch(action.type){
        case WRITE_REQUEST:
        case WRITE_SUCCESS:
        case WRITE_FAIL:
            return action.payload;
        default:
            return state;
    }

}


function* request(action:PayloadAction<FormDataType>){
    const userData=action.payload;
    console.log(userData.data);
    try{
        yield call([clinet,"post"],"/post/upload",userData.data);
        yield put(writeSuccess({
            result:"success",
        }))
    }catch(e){
        yield put(wrtieFail({
            result:"fail",
            reason:e
        }))
    }
}

function* watchWrite(){
    yield takeLatest(WRITE_REQUEST,request);
}

export {writeReducer,watchWrite}
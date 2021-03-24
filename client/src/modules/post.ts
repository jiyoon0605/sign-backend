import { createAction,  PayloadAction } from "@reduxjs/toolkit";
import {  call,  put, takeLatest } from "redux-saga/effects";
import axios from 'axios';


interface ListRequest{
    result?:"pendding",
    id:string
};
interface RequestSuccess{
    result:"success",
    data:[]
};

interface RequestFail{
    result:"fail",
    reason:string|Error
};

const POST_LIST_REQUEST="POST_LIST_REQUEST";
const POST_LIST_SUCCESS="POST_LIST_SUCCESS";
const POST_LIST_FAIL="POST_LIST_FAIL";

export const listRequest=createAction<ListRequest>(POST_LIST_REQUEST);
const requestSuccess=createAction<RequestSuccess>(POST_LIST_SUCCESS);
const requestFail=createAction<RequestFail>(POST_LIST_FAIL);

type PostType=RequestSuccess|RequestFail|ListRequest;
type PostRequestType=PayloadAction<ListRequest>|PayloadAction<RequestSuccess>|PayloadAction<RequestFail>;

const postReducer=(state:PostType={
    result:"pendding",
    id:"0"
},action:PostRequestType)=>{
    switch(action.type){
        case POST_LIST_REQUEST:
        case POST_LIST_SUCCESS:
        case POST_LIST_FAIL:
            return action.payload;
        default:
            return state
    }
}

function* request(action:PayloadAction<ListRequest>){
    try{
        const {data} = yield call([axios,"get"],`/auth/login/${action.payload.id}`);
        console.log(data)
         yield put(requestSuccess({
             result:"success",
             data
         }));
         
         localStorage.setItem("accessToken",data.token);
    }
    catch(err){

        yield put(requestFail({
            result:"fail",
            reason:err.response.data.error
        }));
    }
}

function* watchPost(){
    yield takeLatest(POST_LIST_REQUEST,request);
}

export {postReducer,watchPost};
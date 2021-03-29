import { createAction,  PayloadAction } from "@reduxjs/toolkit";
import getRequest from 'api';
import {  call,  put, takeLatest } from "redux-saga/effects";

interface InitState{
    result:"no started"
}

interface ListData{
  writer:string
}
export interface DetailState{
    _id:string,
    content:string,
    createNum:string,
    title:string,
    endDate:string,
    writer:string,
    writerId:string,
    goalNum: number,
    list:ListData[],
    createAt:string,
    category:string
  
    
};


interface RequestState{
    result?:"pednning",
    id?:string
};

interface RequestSuccess{
    result:"list",
    data:DetailState[]
};
interface DetailRequestSuccess{
    result:"detail",
    data:DetailState
};

type CategoryType="other"|"sport"|"enter"|"individ"|"game"|"all";

const POST_LIST_REQUEST="POST_LIST_REQUEST";
const POST_SUCCESS="POST_SUCCESS";

const POST_DETAIL_REQUEST="POST_DETAIL_REQUEST";


export const listRequest=createAction<CategoryType>(POST_LIST_REQUEST);
export const detailRequest=createAction<RequestState>(POST_DETAIL_REQUEST);
const requestSuccess=createAction<RequestSuccess|DetailRequestSuccess>(POST_SUCCESS);


type PostType=RequestSuccess|InitState|RequestState|DetailRequestSuccess;
type PostActionType=PayloadAction<RequestState>|PayloadAction<RequestSuccess>|PayloadAction<DetailRequestSuccess>;

const postReducer=(state:PostType={result:"no started"},action:PostActionType):PostType=>{
    switch(action.type){
        case POST_SUCCESS:
            return action.payload;
        default:
            return state
    }
}

function* postListRequest(action:PayloadAction<CategoryType>){
    try{
        if(action.payload==="all"){
            const {data} = yield call([getRequest(),"get"],`/post/`);
            yield put(requestSuccess({
            result:"list",
            data
         }));
        }else{
            const {data}=yield call([getRequest(),"get"],`/post/category/${action.payload}`);
            yield put(requestSuccess({
                result:"list",
                data
            }));
        } 

         
    }
    catch(err){
        alert(err.response.data.error);
    }
}

function* postDetailRequest(action:PayloadAction<RequestState>){
    try{
        const {data}=yield call([getRequest(),"get"],`/post/${action.payload.id}`);
        yield put(requestSuccess({
            result:"detail",
            data:data.post
        }));
    }catch(err){
         alert(err);
    }
}

function* watchPost(){
    yield takeLatest(POST_LIST_REQUEST,postListRequest);
    yield takeLatest(POST_DETAIL_REQUEST,postDetailRequest);
}

export {postReducer,watchPost};
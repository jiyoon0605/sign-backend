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
    category:string,
  
    
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

export type CategoryType="other"|"sport"|"enter"|"individ"|"game"|"all"|"area";

const POST_LIST_REQUEST="POST_LIST_REQUEST";
const POST_SUCCESS="POST_SUCCESS";

const POST_DETAIL_REQUEST="POST_DETAIL_REQUEST";
const POST_SIGN_REQUEST="POST_SIGN_REQUEST";
const POST_DELETE_REQUEST="POST_DELETE_REQUEST";

export const listRequest=createAction<CategoryType>(POST_LIST_REQUEST);
export const detailRequest=createAction<RequestState>(POST_DETAIL_REQUEST);
export const signRequest=createAction<RequestState>(POST_SIGN_REQUEST);
export const deleteRequest=createAction<RequestState>(POST_DELETE_REQUEST);
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
function* postSignRequest(action:PayloadAction<RequestState>){
    try{
        yield call([getRequest(),"get"],`/post/sign/${action.payload.id}`);
        alert("동의하였습니다.")
        yield put(detailRequest({id:action.payload.id}));
    }catch(err){
        if(err.response.status===404)
            alert(err.response.data.error);
        else    
            alert("예상치 못한 에러");
    }
}
function* postDeleteRequest(action:PayloadAction<RequestState>){
    try{
        yield call([getRequest(),"delete"],`/post/${action.payload.id}`);
        alert("삭제 완료하였습니다.")
    }catch(err){
        if(err.response.status===404)
            alert(err.response.data.error);
        else    
            alert("예상치 못한 에러");
    }

}

function* watchPost(){
    yield takeLatest(POST_LIST_REQUEST,postListRequest);
    yield takeLatest(POST_DETAIL_REQUEST,postDetailRequest);
    yield takeLatest(POST_SIGN_REQUEST,postSignRequest);
    yield takeLatest(POST_DELETE_REQUEST,postDeleteRequest);
}

export {postReducer,watchPost};
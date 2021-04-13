import { createAction,  PayloadAction } from "@reduxjs/toolkit";
import getRequest from 'api';
import {  call,  put, takeLatest } from "redux-saga/effects";
import {DetailState} from "./post";

interface RequestState{
    type:"post"|"agree",
    data?:[]
}
interface RequestSuccess{
    type:"post"|"agree",
    data:DetailState[]|null;
}

const MYPAGE_POST_REQUEST="MYPAGE_POST_REQUEST";
const MYPAGE_SUCCESS="MYPAGE_SUCCESS";

export const mypageRequest=createAction<RequestState>(MYPAGE_POST_REQUEST);
const mypageSuccess=createAction<RequestSuccess>(MYPAGE_SUCCESS);

type StateType=RequestSuccess|RequestState;
type ActionType=PayloadAction<RequestState>|PayloadAction<RequestSuccess>;

const mypageReducer=(state:StateType={type:"post",data:[]},action:ActionType):StateType=>{
    switch(action.type){
        case MYPAGE_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}

function* getMypage(action:PayloadAction<RequestState>){
    try{
       const {data}= yield call([getRequest(),"get"],`post/mypage/${action.payload.type}`);
       if(data.length>0){
            yield put(mypageSuccess({
                type:`${action.payload.type}` as "post"|"agree",
                data
            }));
       }
       else{
           yield put(mypageSuccess({
               type:"post",
               data:[]
            }));
       }
    }catch(err){
        alert("마이페이지 불러오기를 실패하였습니다.");
    }
}

function* watchMypage(){
    yield takeLatest(MYPAGE_POST_REQUEST,getMypage);
}

export {mypageReducer,watchMypage};
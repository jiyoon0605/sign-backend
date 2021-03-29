import { createAction,  PayloadAction } from "@reduxjs/toolkit";
import getRequest from 'api';
import {  call,  put, takeLatest } from "redux-saga/effects";

interface UserData{
    name:string,
    id:string
};


const USERDATA_REQUEST="USERDATA_REQUEST";
const USERDATA_SUCCESS="USERDATA_SUCCESS";


export const userDataRequest=createAction(USERDATA_REQUEST);
const userDataSuccess=createAction<UserData>(USERDATA_SUCCESS);

type UserDataActionType=PayloadAction<UserData>;

const userDataReducer=(state:UserData={
        name:"",
        id:""
},action:UserDataActionType):UserData=>{
    switch(action.type){
        case USERDATA_SUCCESS:
            return action.payload;
        default:
            return state;
    }
};


function* request(){
   
    try{
        const {data}=yield call([getRequest(),"get"],"/auth/userData");
        const {id,name}=data.data;
        yield put(userDataSuccess({
            id,
            name
        }))
    }
    catch(err){
        if(err.response){
            alert(err.response.data.message);
            localStorage.removeItem("accessToken");
        }
        
    }
};

function* watchUserData(){
    yield takeLatest(USERDATA_REQUEST,request);
};

export {userDataReducer,watchUserData};

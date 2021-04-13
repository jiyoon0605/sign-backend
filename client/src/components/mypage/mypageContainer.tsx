import { RootState } from "modules";
import React, { useEffect} from "react";
import { useHistory } from "react-router-dom";
import {useDispatch,useSelector}from "react-redux";
import {mypageRequest} from "modules/mypage";


import MypagePresenter from "./mypagePresenter";


const MypageContainer:React.FC=()=>{
    const state=useSelector((state:RootState)=>state.userDataReducer);
    const data=useSelector((state:RootState)=>state.mypageReducer);
    const dispatch=useDispatch();
    const histroy=useHistory();
    
    useEffect(()=>{
        if(!localStorage.getItem("accessToken")){
            alert("로그인 후 이용 가능합니다.");
            histroy.push("/post");
            return;
        }
    },[dispatch, histroy,state]);

    const RequestMypost=()=>{
        dispatch(mypageRequest({type:"post"}));
    }
    const RequestAgreePost=()=>{
        dispatch(mypageRequest({type:"agree"}));
    }

    
    return <MypagePresenter userData={state} data={data.data||[]} RequestMypost={RequestMypost} RequestAgreePost={RequestAgreePost}/>
}

export default MypageContainer;
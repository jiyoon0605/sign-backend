import { RootState } from 'modules';
import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import MypagePresenter from "./mypagePresenter"



const MypageContainer:React.FC=()=>{
    const state=useSelector((state:RootState)=>state.userDataReducer);
    
    const histroy=useHistory();

    useEffect(()=>{
        if(!localStorage.getItem("accessToken")){
            alert("로그인 후 이용 가능합니다.");
            histroy.push("/post");
        }
    },[histroy])
    
    return <MypagePresenter userData={state}/>
}

export default MypageContainer;
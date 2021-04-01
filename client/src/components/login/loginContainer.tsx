import React,{useEffect, useState} from 'react';

import {useDispatch, useSelector}from 'react-redux';
import { RootState} from 'modules';
import {useHistory}from 'react-router'
import {userDataRequest}from 'modules/userData';
import {loginRequest}from 'modules/login'

import LoginPresernter from './loginPresenter'

const LoginConainer:React.FC=()=>{
    const [email,setEmail]=useState<string>("");
    const [password,setPassword]=useState<string>("");
    const state=useSelector((state:RootState)=>state.loginReducer);
    const history=useHistory();
    const dispatch=useDispatch();

    const onHandleClick=()=>{
        console.log("submit")
        const emailRegExp=/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[00-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        if(!emailRegExp.test(email)){
            alert("이메일 형식을 맞춰주세요.");
            return;
        }
        if(!password||!email){
            alert("모든 입력란을 채워 주세요.");
            return;
        }
        const data={
            email,
            password
        };
        dispatch(loginRequest(data));
    };
    useEffect(()=>{
        if(state==="access"){
            alert("로그인에 성공하셨습니다!");
            history.push("/post");
            dispatch(userDataRequest())
        }
    },[state,dispatch,history]);

    return <LoginPresernter 
                email={email} 
                password={password} 
                setEmail={setEmail} 
                setPassword={setPassword} 
                onHandleClick={onHandleClick}/>
};

export default LoginConainer;
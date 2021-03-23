import React,{useEffect, useState} from 'react';

import * as S from 'style/auth';

import {useDispatch, useSelector}from 'react-redux';
import { RootState} from 'modules';
import {useHistory}from 'react-router'

import {loginRequest}from 'modules/login'
import {userDataRequest}from 'modules/userData';

const Login:React.FC=()=>{
    const [email,setEmail]=useState<string>("");
    const [password,setPassword]=useState<string>("");
    const state=useSelector((state:RootState)=>state.loginReducer);
    const histroy=useHistory();
    const dispatch=useDispatch();

    const onHandleClick=()=>{
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
        if(state.result==="success"){
            alert("로그인에 성공하셨습니다!");
            histroy.push("/");
            dispatch(userDataRequest());
        }
        else if(state.result==="fail"){
            alert(state.reason);
        }
    },[state,dispatch,histroy]);

    return <S.Container>
        <S.Title>로그인</S.Title>
        <S.InputField placeholder="이메일" value={email} onChange={e=>setEmail(e.target.value)}/>
        <S.InputField placeholder="비밀번호" type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
        <S.SubmitButton onClick={onHandleClick}>로그인</S.SubmitButton>
        <S.LinkBtn to="/register">회원가입 하기</S.LinkBtn>
    </S.Container>
};

export default Login;
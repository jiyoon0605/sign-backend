import React,{useState,useReducer,useEffect} from 'react';
import * as S from 'style/auth';
import {registerComplate, registerRequest}from 'modules/register';

import {useDispatch, useSelector}from 'react-redux';
import { RootState} from 'modules';
import {useHistory}from 'react-router'
import axios from 'axios';

interface registerType{
    email:string,
    authNum:string,
    name:string,
    password:string,
    isSamePasword:boolean
};
interface actionType{
    type:"EMAIL"|"NAME"|"PASSWORD"|"PASSWORDCONFIRM"|"AUTHNUM";
    data:string
};



const Regiter:React.FC=()=>{
    const dispatch=useDispatch();
    const state=useSelector((state:RootState)=>state.registerReducer);
    const histroy=useHistory();

    const [authNum,setAuthnum]=useState<string>("-")

    useEffect(()=>{
        if(state==="complate"){
            alert("회원가입에 성공하였습니다!");
            dispatch(registerComplate());
            histroy.push("/login")
        }
    },[dispatch, histroy, state])

    const reducer=(state:registerType,action:actionType):registerType=>{
        switch(action.type){
            case "EMAIL":
                return {...state,email:action.data};
            case "NAME":
                return {...state,name:action.data};
            case "PASSWORD":
                return {...state,password:action.data};
            case "PASSWORDCONFIRM":
                return {...state,isSamePasword:action.data===state.password};
            case "AUTHNUM":
                return {...state,authNum:action.data};
            default:
                return state
        }
    }

    const initalData:registerType={
        email:"",
        authNum:"",
        name:"",
        password:"",
        isSamePasword:true

    }
    const [registerData,setRegisterData]=useReducer(reducer,initalData);

    const onHandleClick=()=>{
        const emailRegExp=/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[00-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        const {email,name,password,isSamePasword}=registerData;
        if(!email||!name||!password){
            alert("모든 입력란을 채워주세요.");
        }
        else if(!isSamePasword){
            alert("비밀번호가 맞지 않습니다.");
        }
        else if(!emailRegExp.test(email)){
            alert("이메일 형식에 맞게 작성해주세요.");
        }
        else if(password.length<8){
            alert("비밀번호는 8자 이상으로 작성하셔야 안전합니다.");
        }
        else if(authNum!==registerData.authNum){
            alert("인증번호가 맞지 않습니다.");
        }
        else{
            dispatch(registerRequest(registerData));
        }
        
    }

    const requestAuthNum=()=>{
        const data={
            email:registerData.email
        };
        axios.post("auth/sendEmail",data)
        .then(e=>{
            alert("인증번호가 발송되었습니다!");
            setAuthnum(String(e.data.msg));
        })
        .catch(alert);
    }


    return <S.Container>
        <S.Title>계정 생성</S.Title>
        <span>
        <S.InputEmail placeholder="이메일"value={registerData.email} onChange={e=>setRegisterData({type:"EMAIL",data:e.target.value})}/>
        <S.EmailBtn onClick={requestAuthNum}>인증번호 발송</S.EmailBtn>
        </span>
        <S.InputField placeholder="인증번호" value={registerData.authNum} onChange={e=>setRegisterData({type:"AUTHNUM",data:e.target.value})}/>
        <S.InputField placeholder="이름"value={registerData.name} onChange={e=>setRegisterData({type:"NAME",data:e.target.value})}/>
        <S.InputField type="password" placeholder="비밀번호" value={registerData.password} onChange={e=>setRegisterData({type:"PASSWORD",data:e.target.value})}/>
        <S.InputField type="password" placeholder="비밀번호 확인" onChange={e=>setRegisterData({type:"PASSWORDCONFIRM",data:e.target.value})}
                    onKeyUp={(e)=>{if(e.key === "Enter") onHandleClick()}}/>
        <S.SubmitButton onClick={onHandleClick}>
            시작하기
        </S.SubmitButton>
    </S.Container>
}

export default  Regiter;
import React,{useReducer,useEffect} from 'react';
import * as S from 'style/signin';
import {registerRequest}from 'modules/register';

import {useDispatch, useSelector}from 'react-redux';
import { RootState} from 'modules';
import {useHistory}from 'react-router'

interface registerType{
    email:string,
    name:string,
    password:string,
    isSamePasword:boolean
};
interface actionType{
    type:"EMAIL"|"NAME"|"PASSWORD"|"PASSWORDCONFIRM";
    data:string
};
interface failType{
    result: "fail", 
    reason: {
        fail:string
    }
}

const Regiter:React.FC=()=>{
    const dispatch=useDispatch();
    const state=useSelector((state:RootState)=>state.registerReducer);
    const histroy=useHistory();

    useEffect(()=>{
        if(state.result==="fail"){
            alert(state.reason);
        }
        else if(state.result==="success"){
            alert("회원가입에 성공하였습니다!");
            histroy.push("/login")
        }
    },[state])

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
            default:
                return state
        }
    }

    const initalData:registerType={
        email:"",
        name:"",
        password:"",
        isSamePasword:true

    }
    const [registerData,setRegisterData]=useReducer(reducer,initalData);

    const onHandleClick=()=>{
        const {email,name,password,isSamePasword}=registerData;
        if(!email||!name||!password){
            alert("모든 입력란을 채워주세요.");
        }
        else if(!isSamePasword){
            alert("비밀번호가 맞지 않습니다.")
        }
        dispatch(registerRequest(registerData));
    }

    return <S.Container>
        <S.Title>계정 생성</S.Title>
        <S.InputField placeholder="이메일"value={registerData.email} onChange={e=>setRegisterData({type:"EMAIL",data:e.target.value})}/>
        <S.InputField placeholder="이름"value={registerData.name} onChange={e=>setRegisterData({type:"NAME",data:e.target.value})}/>
        <S.InputField type="password" placeholder="비밀번호" value={registerData.password} onChange={e=>setRegisterData({type:"PASSWORD",data:e.target.value})}/>
        <S.InputField type="password" placeholder="비밀번호 확인" onChange={e=>setRegisterData({type:"PASSWORDCONFIRM",data:e.target.value})}/>
        <S.SubmitButton onClick={onHandleClick}>
            시작하기
        </S.SubmitButton>
    </S.Container>
}

export default  Regiter;
import React,{useState,useReducer,useEffect} from 'react';
import RegisterPresenter from './registerPresenter'
import {registerComplate, registerRequest}from 'modules/register';

import {useDispatch, useSelector}from 'react-redux';
import { RootState} from 'modules';
import {useHistory}from 'react-router'
import axios from 'axios';

export interface RegisterType{
    email:string,
    authNum:string,
    name:string,
    password:string,
    isSamePasword:boolean
};
export interface ActionType{
    type:"EMAIL"|"NAME"|"PASSWORD"|"PASSWORDCONFIRM"|"AUTHNUM";
    data:string
};



const RegiterContainer:React.FC=()=>{
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

    const reducer=(state:RegisterType,action:ActionType):RegisterType=>{
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

    const initalData:RegisterType={
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
        const client=axios.create({
            baseURL:"https://dsm-sign.herokuapp.com",
        });
        client.post("auth/sendEmail",data)
        .then(e=>{
            alert("인증번호가 발송되었습니다!");
            setAuthnum(String(e.data.msg));
        })
        .catch(alert);
    }


    return <RegisterPresenter registerData={registerData} requestAuthNum={requestAuthNum} setRegisterData={setRegisterData} onHandleClick={onHandleClick}/>
}

export default  RegiterContainer;
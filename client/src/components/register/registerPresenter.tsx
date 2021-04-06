import React from 'react';
import * as S from 'style/auth';
import {RegisterType,ActionType} from './registerContainer';

type Props={
    registerData:RegisterType,
    requestAuthNum:()=>void,
    setRegisterData:(obj:ActionType)=>void,
    onHandleClick:()=>void,


};

const RegiterPresenter:React.FC<Props>=({registerData,requestAuthNum,setRegisterData,onHandleClick})=>{

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

export default  RegiterPresenter;
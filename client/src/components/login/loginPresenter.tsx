import React  from 'react';

import * as S from 'style/auth';


type Props={
    email:string,
    setEmail:(s:string)=>void,
    password:string,
    setPassword:(s:string)=>void,
    onHandleClick:()=>void,
}

const LoginPresenter:React.FC<Props>=({email,setEmail,password,setPassword,onHandleClick})=>{

    return <S.Container>
        <S.Title>로그인</S.Title>
        <S.InputField placeholder="이메일" value={email} onChange={e=>setEmail(e.target.value)}/>
        <S.InputField placeholder="비밀번호" type="password" 
        value={password} onChange={e=>setPassword(e.target.value)} 
        onKeyUp={(e)=>{
            if(e.key === "Enter"){
                onHandleClick();
            }
        }}/>
        <S.SubmitButton onClick={onHandleClick} >로그인</S.SubmitButton>
        <S.LinkBtn to="/register">회원가입 하기</S.LinkBtn>
    </S.Container>
};

export default LoginPresenter;
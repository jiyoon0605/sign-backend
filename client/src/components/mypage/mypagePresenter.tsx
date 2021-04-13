import React from "react";
import * as S from "style/mypage";
import PostItem from "components/postItem";
import {DetailState}from "modules/post";

interface Props{
    userData:{
        id:string,
        name:string,
        email:string
    },
    data:DetailState[];
    RequestMypost:()=>void;
    RequestAgreePost:()=>void;
}

const MypagePresenter:React.FC<Props>=({userData,data,RequestMypost,RequestAgreePost})=>{
    return <S.Container>
        <S.ContainerBox>
            <S.UserDataContainer>
                <S.UserName>{userData.name}</S.UserName>
                <S.UserEmail>{userData.email}</S.UserEmail>
            </S.UserDataContainer>
            <S.ButtonContainer>
                <S.Button onClick={RequestMypost}>내가 작성한 글</S.Button>
                <S.Button onClick={RequestAgreePost}>내가 동의한 글</S.Button>
            </S.ButtonContainer>
            {data.map((e)=> <PostItem data={e}/>)}
        </S.ContainerBox>
    </S.Container>   
}

export default MypagePresenter;
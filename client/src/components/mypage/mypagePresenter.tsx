import React from "react";
import * as S from "style/mypage";

interface Props{
    userData:{
        id:string,
        name:string,
        email:string
    }
}

const MypagePresenter:React.FC<Props>=({userData})=>{
    return <S.Container>
        <S.ContainerBox>
            <S.UserDataContainer>
                <S.UserName>{userData.name}</S.UserName>
                <S.UserEmail>{userData.email}</S.UserEmail>
            </S.UserDataContainer>
            <S.ButtonContainer>
                <S.Button>내가 작성한 글</S.Button>
                <S.Button>내가 동의한 글</S.Button>
            </S.ButtonContainer>
        </S.ContainerBox>
    </S.Container>   
}

export default MypagePresenter;
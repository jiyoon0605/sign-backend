import React from 'react';
import * as S from 'style/post'
import { CategoryType } from 'modules/post'
import { DataType } from 'components/post/postContainer';
import PopularPost from './popularPost'

type Props={
    setAlign:(s:string)=>void,
    onCategortyChange:(s:CategoryType)=>void,
    list:JSX.Element[],
    popular:DataType[],
}

const PostPresenter:React.FC<Props>=({setAlign,onCategortyChange,list,popular})=>{
    return <S.Container>
            {popular.length>0&&<PopularPost data={popular[0]}></PopularPost>}
        <S.CategoryContainer>
            <S.SelectButton defaultValue="latest" 
                    onChange={(e)=>{
                    setAlign(e.target.value);
                }}>
            <option value="latest">최신순</option>
            <option value="random">랜덤순</option>
            <option value="rates">동의율 순</option>
            </S.SelectButton>
            <S.ScrollContainer>
            <S.NavButton onClick={()=>onCategortyChange("all")}>전체</S.NavButton>
            <S.NavButton onClick={()=>onCategortyChange("game")}>게임</S.NavButton>
            <S.NavButton onClick={()=>onCategortyChange("enter")}>연예</S.NavButton>
            <S.NavButton onClick={()=>onCategortyChange("sport")}>스포츠</S.NavButton>
            <S.NavButton onClick={()=>onCategortyChange("individ")}>개인</S.NavButton>
            <S.NavButton onClick={()=>onCategortyChange("area")}>지역</S.NavButton>
            <S.NavButton onClick={()=>onCategortyChange("other")}>기타</S.NavButton>
            </S.ScrollContainer>
            
            
        </S.CategoryContainer>
         <S.PostContainer>
        {list}
         </S.PostContainer>
         <S.FooterContainer></S.FooterContainer>
    </S.Container>
    
};

export default PostPresenter;
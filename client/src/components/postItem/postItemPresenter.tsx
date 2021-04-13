import React  from 'react'
import * as S from 'style/post'
//import ProgressBar from "";
import {DataType}from '../post/postContainer'
import Progerssbar from './progress'

type Props={
    gotoDetail:()=>void,
    imgPath:string,
    data:DataType,
    percentage:number
}


const PostItemPresenter:React.FC<Props>=({gotoDetail,imgPath,data,percentage})=>{  
    return(
        <S.ItemContainer onClick={gotoDetail}>

            <S.ImageContainer src={imgPath}/>
            <S.ItemMain>
                <S.Title>{data.title}</S.Title>
                <S.DateBox>
                    <S.MenuText>작성자</S.MenuText>
                    <S.DateText>{data.writer}</S.DateText>
                </S.DateBox>
                <S.Contents>{data.content}</S.Contents>
                <S.DateBox>
                    <S.MenuText>시작 날짜</S.MenuText>
                    <S.DateText>{data.createAt.slice(0,10)}</S.DateText>
                </S.DateBox>
                <S.DateBox>
                    <S.MenuText>마감 날짜</S.MenuText>
                    <S.DateText>{data.endDate}</S.DateText>
                </S.DateBox>
                <S.CategoeyBox>
                {data.category}
                </S.CategoeyBox>
               
                {data.activation?
                 <Progerssbar percentage={percentage}/>
                :<S.Termination>{ percentage>=100?"목표 달성 성공!":`마감되었습니다!   ${percentage}% 달성!`}</S.Termination>}
                
            </S.ItemMain>
            {percentage>=100&&
           <S.Resultlabel>목표 달성!</S.Resultlabel> }
        </S.ItemContainer>
    )    
}

export default PostItemPresenter;
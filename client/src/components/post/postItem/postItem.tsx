import React, { useEffect, useState,useMemo } from 'react'
import * as S from 'style/post'
import ProgressBar from "@ramonak/react-progress-bar";
import getRequest from 'api';
import {useHistory} from 'react-router';



interface DataType{
    data:{
        _id:string,
        content:string,
        createNum:string,
        title:string,
        endDate:string,
        writer:string,
        writerId:string,
        goalNum: number,
        list:object[],
        createAt:string,
        category:string
    }
   
}

const PostItem:React.FC<DataType>=({data})=>{

    const [imgPath,setImgPath]=useState<string>("");
    const {title,content,list,goalNum,_id,endDate,writer,createAt,category}=data;
    const percentage=useMemo(()=> Math.round((list.length/goalNum)*100),[goalNum, list.length])

    const history=useHistory();

    useEffect(()=>{
        getRequest().post("/post/img",{
            id:_id
        }).then((e:any)=>{
            setImgPath(`data:${e.data.contentType};base64,${e.data.base64}`)
          })
    },[_id])

    
    return(
        <S.ItemContainer onClick={()=>{history.push(`/post/${_id}`)}}>
            <S.ImageContainer src={imgPath}/>
            <S.ItemMain>
                <S.Title>{title}</S.Title>
                <S.DateBox>
                    <S.MenuText>작성자</S.MenuText>
                    <S.DateText>{writer}</S.DateText>
                </S.DateBox>
                <S.Contents>{content}</S.Contents>
                <S.DateBox>
                    <S.MenuText>시작 날짜</S.MenuText>
                    <S.DateText>{createAt.slice(0,10)}</S.DateText>
                </S.DateBox>
                <S.DateBox>
                    <S.MenuText>마감 날짜</S.MenuText>
                    <S.DateText>{endDate}</S.DateText>
                </S.DateBox>
                <S.CategoeyBox>
                {category}
                </S.CategoeyBox>
                
                <ProgressBar 
                    completed={percentage} 
                    bgcolor="#FF4141"
                    height="1rem"
                    width="100%"
                    labelAlignment="left"
                    labelColor={percentage>5?"white":"black"}
                    labelSize=".5rem"
                    margin="1rem 10px 0 0"
                    borderRadius="0"/>
            </S.ItemMain>
            
        </S.ItemContainer>
    )    
}

export default PostItem;
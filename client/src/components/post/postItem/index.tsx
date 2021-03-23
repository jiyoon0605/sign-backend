import axios from 'axios';
import React, { useEffect, useState } from 'react'
import * as S from 'style/post'
import ProgressBar from "@ramonak/react-progress-bar";

type Props={
    item:{
        _id:string,
        content:string,
        createNum:string,
        title:string,
        endDate:string,
        writer:string,
        writerId:string,
        goalNum: number,
        curNum:number
    }
}

const PostItem:React.FC<Props>=({item})=>{

    const [imgPath,setImgPath]=useState<string>("");
    const {title,content,curNum,goalNum,_id}=item;
    useEffect(()=>{
        axios.post("/post/img",{
            id:_id
        }).then((e:any)=>{
            setImgPath(`data:${e.data.contentType};base64,${e.data.base64}`)
          })
    },[_id])

    
    return(
        <S.ItemContainer>
            <S.ItemMain>
                <S.ImageContainer src={imgPath}/>
                <S.TextBox>
                    <S.Title>{title}</S.Title>
                    <S.Contents>{content}</S.Contents>
                </S.TextBox>
                
            </S.ItemMain>
            <S.ItemFooter>
                <ProgressBar  completed={curNum/goalNum} height="10px" isLabelVisible={false}/>
            </S.ItemFooter>
        </S.ItemContainer>
    )    
}


export default PostItem;
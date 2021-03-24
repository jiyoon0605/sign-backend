import React, { useEffect, useState } from 'react'
import * as S from 'style/post'
import ProgressBar from "@ramonak/react-progress-bar";
import getRequest from 'api';
import {useHistory} from 'react-router';


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
        list:object[]
    }
}

const PostItem:React.FC<Props>=({item})=>{

    const [imgPath,setImgPath]=useState<string>("");
    const {title,content,list,goalNum,_id,endDate,writer}=item;
    useEffect(()=>{
        getRequest().post("/post/img",{
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
                <ProgressBar  completed={Math.round((list.length/goalNum)*100)} height="10px" labelAlignment="outside" labelColor="black" bgcolor="#FF4141"/>
                <S.InfoContainer>
                    <div> {endDate} 마감 </div>
                    <div>작성자 : {writer}</div>            
                </S.InfoContainer>
            </S.ItemFooter>
        </S.ItemContainer>
    )    
}

export default PostItem;
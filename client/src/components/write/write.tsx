import React, { useEffect, useState } from 'react';
import * as S from 'style/write';


import {useDispatch, useSelector}from 'react-redux';
import { RootState} from 'modules';
import {writeRequest}from 'modules/write'
import {useHistory}from 'react-router'
const Write:React.FC=()=>{
    const [imgData,setImgData]=useState<File>();
    const [imgPath,setImgPath]=useState<any>();
    const [title,setTitle]=useState<string>("");
    const [content,setContent]=useState<string>("");
    const [num,setNum]=useState<string>("0");
    const [date,setDate]=useState<string>("");

    const dispatch=useDispatch();
    const state=useSelector((state:RootState)=>state.writeReducer);
    const histroy=useHistory();

    useEffect(()=>{
        if(state.result==="fail"){
            alert(state.reason)
        }
        else if(state.result==="success"){
            alert("글이 등록되었습니다!");
            histroy.push("/post");
        }
    },[state,histroy])

    const imageReader = (e:File) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(e);
        fileReader.onload = (e) => {
            setImgPath(e.target?.result);
        };
      };
      
      const onSubmit=()=>{
          if(!imgData||!title||!content||!date||!num){
              alert("모든 빈칸을 채워 주세요.");
              return;
          }
          const data=new FormData();
          data.append("img",imgData);
          data.append("title",title);
          data.append("content",content);
          data.append("endDate",date);
          data.append("goalNum",num);

          dispatch(writeRequest({data}))
          
      }

    return <S.Container>
        <S.ContainerBox>
            <S.ImageContainer src={imgPath}/>
            <S.ImgInput id="img" type="file" accept="image/*" 
            onChange={(e)=>{
                if(e.target.files){
                    setImgData(e.target.files[0]);    
                    imageReader(e.target.files[0]);
                }
                
            }}/>
            <S.ImgLabel htmlFor="img">이미지 추가</S.ImgLabel>
            <S.ContentsContainer>
                <S.Title>제목</S.Title>
                <S.TextInput placeholder="제목" value={title} onChange={e=>{setTitle(e.target.value)}}/>
                <S.Title>내용</S.Title>
                <S.ContentsInput placeholder="내용" value={content} onChange={e=> setContent(e.target.value)}/>
                <S.Title>목표 인원</S.Title>
                <S.TextInput placeholder="목표 인원" type="number" defaultValue={0} value={num} onChange={e=>{setNum(e.target.value);}}/>
                <S.Title>마감 날짜</S.Title>
                <S.TextInput type="date" value={date} onChange={e=>setDate(e.target.value)}/>
            </S.ContentsContainer>
           
        </S.ContainerBox>
        <S.SubmitBtn onClick={onSubmit}>작성 완료</S.SubmitBtn>
    </S.Container>
};

export default Write;
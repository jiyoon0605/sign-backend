import React, { useEffect, useState,useRef } from 'react';

import {useDispatch, useSelector}from 'react-redux';
import { RootState} from 'modules';
import {writeComplate, writeRequest}from 'modules/write'
import { CategoryType } from 'modules/post';
import {useHistory}from 'react-router'
import WritePresenter from 'components/write/writePresenter';

const WriteContainer:React.FC=()=>{
    const [imgData,setImgData]=useState<File>();
    const [imgPath,setImgPath]=useState<any>();
    const [title,setTitle]=useState<string>("");
    const [content,setContent]=useState<string>("");
    const [num,setNum]=useState<string>("0");
    const [date,setDate]=useState<string>("");
    const [category,setCategory]=useState<CategoryType>("other");
    const textArea=useRef<HTMLTextAreaElement>(null);

    const dispatch=useDispatch();
    const state=useSelector((state:RootState)=>state.writeReducer);
    const histroy=useHistory();

    useEffect(()=>{
        if(!localStorage.getItem("accessToken")){
            alert("로그인 후 이용 가능합니다.");
            histroy.push("/post");
        }
        else if(state==="complate"){
            alert("글이 등록되었습니다!");
            dispatch(writeComplate());
            histroy.push("/post");
        }
    },[state, histroy, dispatch])

    const imageReader = (e:File) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(e);
        fileReader.onload = (e) => {
            setImgPath(e.target?.result);
        };
      };
      
      const onSubmit=()=>{
        if(!localStorage.getItem("accessToken")){
            alert("로그인 후 이용 가능합니다.");
            histroy.push("/post");
        }
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
          data.append("category",category);

          dispatch(writeRequest({data}))
          
      }


      const getDateString = () => {
        const date = new Date();
        date.setDate(date.getDate()+1);
        const year = date.getFullYear();
        const month = ("0" + (1 + date.getMonth())).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);

        return `${year}-${month}-${day}`;
      };


    return <WritePresenter
                imgPath={imgPath} title={title} textArea={textArea } content={content} num={num} date={date}category={category}
                setImgData={setImgData}imageReader={imageReader} setTitle={setTitle} setContent={setContent}
                setNum={setNum}setDate={setDate}getDateString={getDateString} setCategory={setCategory} onSubmit={onSubmit} />
};

export default WriteContainer;
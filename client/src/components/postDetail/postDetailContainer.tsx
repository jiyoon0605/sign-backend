import React, { useEffect, useState,useMemo } from 'react';
import { RouteComponentProps, useHistory } from "react-router-dom";
import {useDispatch,useSelector}from 'react-redux';
import { RootState } from 'modules';
import getRequest from 'api';
import {deleteRequest, detailRequest,DetailState, signRequest}from 'modules/post';
import 'react-circular-progressbar/dist/styles.css';
import PostDetailPresenter from 'components/postDetail/postDetailPresenter';


interface PathParamsProps {
    id: string;
  }

  const initData={
    _id:"",
    content:"",
    createNum:"",
    title:"",
    endDate:"",
    writer:"",
    writerId:"",
    goalNum: 0,
    list:[],
    createAt:"",
    category:"other",
    activation:true
  }
  
const PostDetailContainer:React.FunctionComponent<RouteComponentProps<PathParamsProps>>=({match})=>{
    const [imgPath,setImgPath]=useState<string>("");
    const [data,setData]=useState<DetailState>(initData);
    const {id}=match.params;
    const dispatch=useDispatch();
    const state=useSelector((state:RootState)=>state.postReducer);
    const userData=useSelector((state:RootState)=>state.userDataReducer);
    const percentage=useMemo(()=>Math.round((data.list.length/data.goalNum)*100),[data])
    const history=useHistory();

    useEffect(()=>{
      dispatch(detailRequest({id}))
      getRequest().post("/post/img",{
          id
      }).then((e:any)=>{
          setImgPath(`data:${e.data.contentType};base64,${e.data.base64}`)
        })
  },[id,dispatch]);

    useEffect(() => {
      if(state.result==="detail")
      {
        setData(state.data);
      }
    }, [state]);

    const onSignOn=()=>{
      if(!localStorage.getItem("accessToken")){
        alert("로그인 후 이용가능합니다.")
      }
      else{
        dispatch(signRequest({
          id
        }));
      }

    }

    const maskingName = (strName:string)=> {
      if (strName.length > 2) {
        const originName = strName.split('');
        originName.forEach((e, i)=> {
          if (i === 0 || i === originName.length - 1) return;
          originName[i] = '*';
        });
        const joinName = originName.join();
        return joinName.replace(/,/g, '');
      } else {
        const pattern = /.$/; 
        return strName.replace(pattern, '*');
      }
    };

    const onDelete=()=>{
      dispatch(deleteRequest({id}));
      history.push("/post");
    }
    return <PostDetailPresenter data={data} userData={userData} imgPath={imgPath} percentage={percentage} onSignOn={onSignOn} maskingName={maskingName} onDelete={onDelete}/>
   
}

export default PostDetailContainer;
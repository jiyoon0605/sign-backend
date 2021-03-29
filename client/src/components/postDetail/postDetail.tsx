import React, { useEffect, useState,useMemo } from 'react';
import * as S from 'style/postDetail';
import { RouteComponentProps } from "react-router-dom";
import {useDispatch,useSelector}from 'react-redux';
import { RootState } from 'modules';
import getRequest from 'api';
import {detailRequest,DetailState, signRequest}from 'modules/post';
import { CircularProgressbar,buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


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
    category:"other"
  }
  
const PostDetail:React.FunctionComponent<RouteComponentProps<PathParamsProps>>=({match})=>{
    const [imgPath,setImgPath]=useState<string>("");
    const [data,setData]=useState<DetailState>(initData);
    const {id}=match.params;
    const dispatch=useDispatch();
    const state=useSelector((state:RootState)=>state.postReducer);
    const userData=useSelector((state:RootState)=>state.userDataReducer);
    const percentage=useMemo(()=>Math.round((data.list.length/data.goalNum)*100),[data])

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
      dispatch(signRequest({
        id
      }));
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
        const pattern = /.$/; // 정규식
        return strName.replace(pattern, '*');
      }
    };

  

    return (<div>
    <S.Container>
        <S.HeadInfo>
         <S.ContainerBox>
            <S.InfoBox>
              <S.ImgBox src={imgPath}/>
              <S.TextBox> 
                <S.Title>{data.title}</S.Title>
                <S.ProgressBox>
                  <CircularProgressbar 
                      value={percentage||0} 
                      styles={buildStyles({
                      textSize: 15,
                      textColor: "#ff4141",
                      pathColor: "#ff4141",
                      trailColor: "rgb(200,200,200)"
                      })}
                      text={`${percentage}% 달성`} 
                      strokeWidth={5}/>
                  </S.ProgressBox>
                  { `${data.createAt.slice(0,10)} ~ ${data.endDate}`}
                  <S.CurNum>{`${data.list.length} / ${data.goalNum}`}</S.CurNum>
                  <S.Message>{percentage>=100&&"목표 달성 성공!"}</S.Message>
                  <S.ApplyBtn onClick={onSignOn}> 동의하기 </S.ApplyBtn>
                </S.TextBox>
              </S.InfoBox>   
            </S.ContainerBox>
          <S.ListBox>
             동의한 사람들
          <S.ScrollContainer>
            {data.list.map((e)=><S.ListItem>
              {maskingName(e.writer)}
            </S.ListItem>)}
        </S.ScrollContainer>
      </S.ListBox>
    </S.HeadInfo>
        <S.ContentsBox>
    {data.content}
    {data.writerId===userData.id&&<S.DeleteButton>삭제하기</S.DeleteButton>}
    
    </S.ContentsBox> 
    </S.Container>
    
    </div>)
   
}

export default PostDetail;
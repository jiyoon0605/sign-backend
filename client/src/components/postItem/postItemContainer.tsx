import React, { useEffect, useState,useMemo } from 'react';
import getRequest from 'api';
import {useHistory} from 'react-router';
import {DataType}from '../post/postContainer'

import PostItemPresenter from './postItemPresenter'

type Props={
    data:DataType,
}

const PostItemContainer:React.FC<Props>=({data})=>{

    const [imgPath,setImgPath]=useState<string>("");
    const {list,goalNum,_id}=data;
    const percentage=useMemo(()=> Math.round((list.length/goalNum)*100),[goalNum, list.length])

    const history=useHistory();
    useEffect(()=>{
        getRequest().post("/post/img",{
            id:_id
        }).then((e:any)=>{
            setImgPath(`data:${e.data.contentType};base64,${e.data.base64}`)
          })
    },[_id]);

    const gotoDetail=()=>history.push(`/post/${_id}`);
    
    return <PostItemPresenter gotoDetail={gotoDetail} imgPath={imgPath} data={data} percentage={percentage}/>

    
}

export default PostItemContainer;
import getRequest from 'api';
import PopularPostPresenter from 'components/post/popularPost/popularPostPresenter';
import { DataType } from 'components/post/postContainer';
import React, { useEffect, useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom';


const PopularPostContainer:React.FC<{data:DataType}>=({data})=>{
    const [imgPath,setImgPath]=useState<string>("");
    const percentage=useMemo(()=> Math.round((data.list.length/data.goalNum)*100),[data.goalNum, data.list.length])
    const history=useHistory();

    const gotoDetail=()=>history.push(`/post/${data._id}`);

    useEffect(()=>{
        getRequest().post("/post/img",{
            id:data._id
        }).then((e:any)=>{
            setImgPath(`data:${e.data.contentType};base64,${e.data.base64}`)
          })
    },[data]);
    
    return<PopularPostPresenter gotoDetail={gotoDetail} data={data} imgPath={imgPath} percentage={percentage}/>
}

export default PopularPostContainer;
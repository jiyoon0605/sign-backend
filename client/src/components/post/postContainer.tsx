import React, { useEffect, useRef, useState } from 'react';
import PostItem from 'components/post/postItem';

import { RootState} from 'modules';
import { useDispatch,useSelector } from 'react-redux';
import { listRequest,CategoryType } from 'modules/post';
import PostPresenter from 'components/post/postPresenter';

export type DataType={
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
        category:string,
        activation:boolean
}



const Post:React.FC=()=>{
    const [data,setData]=useState<DataType[]>([]);
    const [list,setList]=useState<JSX.Element[]>([]);
    const [align,setAlign]=useState<string>("latest")
    const state=useSelector((state:RootState)=>state.postReducer);
    const dispatch = useDispatch();

    function ratesAlign(pre:DataType,cur:DataType) {
        const prePer=Math.round((pre.list.length/pre.goalNum)*100);
        const curPer=Math.round((cur.list.length/cur.goalNum)*100);
        return  curPer-prePer; 
    }


    useEffect(()=>{
        dispatch(listRequest("all"));
    },[dispatch]);

    useEffect(() => {
        if(state.result==="list")
            setData(state.data.reverse());
    }, [state]);

    const onCategortyChange=(cat:CategoryType)=>{
        dispatch(listRequest(cat));
    }

    

    useEffect(() => {
        const list=data.slice();
        const sortedList=align==="latest"?data.map((e,i)=><PostItem key={i} data={e}/>):
        align==="rates"?list.sort(ratesAlign).map((e,i)=><PostItem key={i} data={e}/>):
        list.sort(()=>Math.random()-Math.random()).map((e,i)=><PostItem key={i} data={e}/>);
        setList(sortedList);
    }, [align, state, data])

    const getPopular=()=>{
        const popularList=data.slice();
        return popularList.sort(ratesAlign);
    }

    return <PostPresenter setAlign={setAlign} onCategortyChange={onCategortyChange} list={list}
                            popular={getPopular()}/>
    
};

export default Post;
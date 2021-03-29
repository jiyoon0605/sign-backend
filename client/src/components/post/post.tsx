import React, { useEffect, useState } from 'react';
import PostItem from 'components/post/postItem';
import * as S from 'style/post'

import { RootState} from 'modules';
import { useDispatch,useSelector } from 'react-redux';
import { listRequest,CategoryType } from 'modules/post';

interface DataType{
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




    return <S.Container>
        <S.CategoryContainer>
            <S.SelectButton defaultValue="latest" 
                    onChange={(e)=>{
                    setAlign(e.target.value);
                }}>
            <option value="latest">최신순</option>
            <option value="random">랜덤순</option>
            <option value="rates">동의율 순</option>
            </S.SelectButton>
            <S.NavButton onClick={()=>onCategortyChange("all")}>전체</S.NavButton>
            <S.NavButton onClick={()=>onCategortyChange("game")}>게임</S.NavButton>
            <S.NavButton onClick={()=>onCategortyChange("enter")}>연예</S.NavButton>
            <S.NavButton onClick={()=>onCategortyChange("sport")}>스포츠</S.NavButton>
            <S.NavButton onClick={()=>onCategortyChange("individ")}>개인</S.NavButton>
            <S.NavButton onClick={()=>onCategortyChange("area")}>지역</S.NavButton>
            <S.NavButton onClick={()=>onCategortyChange("other")}>기타</S.NavButton>
        </S.CategoryContainer>

         <S.PostContainer>
        {list}
        {/* {renderList()} */}
         </S.PostContainer>

    </S.Container>
    
};

export default Post;
import React, { useEffect, useState } from 'react';
import PostItem from 'components/post/postItem';
import * as S from 'style/post'
import getRequest from 'api';


const Post:React.FC=()=>{
    const [data,setData]=useState<any[]>([])
    useEffect(()=>{
        getRequest().get("/post/")
        .then(e=>{
            console.log(e.data)
            setData(e.data)
        })
    },[])

    return <S.Container>
         <S.PostContainer>
         {data.map((e,i)=><PostItem key={i} item={e}/>)}
         </S.PostContainer>

    </S.Container>
    
};

export default Post;
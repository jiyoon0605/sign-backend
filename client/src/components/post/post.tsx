import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostItem from 'components/post/postItem';
import * as S from 'style/post'


const Post:React.FC=()=>{
    const [data,setData]=useState<any[]>([])
    useEffect(()=>{
        axios.get("/post/")
        .then(e=>{
            console.log(e.data)
            setData(e.data)
            // e.data.map((item:any)=>{
            //     axios.post('/post/img',{
            //         id:item._id
            //     }).then((e:any)=>{
            //         setImagePath([...imgPath,`data:${e.data.contentType};base64,${e.data.base64}`])
            //     })
            // })
            // return imgPath

        })
    },[])

    return <S.Container>
         <S.PostContainer>
         {data.map((e,i)=><PostItem key={i} item={e}/>)}
         </S.PostContainer>

    </S.Container>
    
};

export default Post;
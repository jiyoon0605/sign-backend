import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Post:React.FC=()=>{
    const [imgPath,setImagePath]=useState("")
    useEffect(()=>{
        axios.get("/post/")
        .then(e=>{
            axios.post('/post/img',{
                id:e.data[0]._id
            }).then(e=>{
                setImagePath(`data:${e.data.contentType};base64,${e.data.base64}`)
            })
        })
    },[])
//console.log();
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img src={imgPath}></img>
};

export default Post;
import React, { useState } from 'react';
import * as S from 'style/write';
import axios from 'axios'
import clinet from 'api';


const Write:React.FC=()=>{
    const [imgData,setImgData]=useState<File>();
    const [imgPath,setImgPath]=useState<any>();



    const imageReader = (e:File) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(e);
        fileReader.onload = (e) => {
            setImgPath(e.target?.result);
        };
      };
      



    return <S.Container>
        <S.ContainerBox>
            <S.ImageContainer src={imgPath}/>
            <S.ImgInput id="img" type="file" accept="image/*" 
            onChange={(e)=>{
                if(e.target.files){
                    setImgData(e.target.files[0]);    
                    imageReader(e.target.files[0]);
                }
                
            }}/>
            <S.ImgLabel htmlFor="img">이미지 추가</S.ImgLabel>

            <S.TextInput/>
        </S.ContainerBox>
        <S.SubmitBtn>작성 완료</S.SubmitBtn>
    </S.Container>
};

export default Write;
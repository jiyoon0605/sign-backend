import styled from 'styled-components';

export const Container=styled.div`
    margin-top:60px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`;

export const ContainerBox=styled.div`
    width:800px;
    box-shadow:2px 2px 5px 0 rgba(0,0,0,0.5);



    @media screen and (max-width:1000px){
        width:100%;
        margin:0 5px;
    }
    margin-bottom:30px;
`;

export const SubmitBtn=styled.div`
    width:200px;
    height:40px;
    margin:20px 0;
    background-color:#FF4141;

    font-size:15px;
    color:white;
    font-family:"Medium";

    display:flex;
    justify-content:center;
    align-items:center;

    &:active{
        box-shadow:inset 2px 2px 3px 0 rgba(0,0,0,0.5);
    }

    cursor: pointer;
`;

export const ImageContainer=styled.img`
    width:100%;
    height:250px;
    background-color:grey;

    object-fit:cover;
`;

export const ImgInput=styled.input`
    position:absolute;
    top:0;
    left:0;
    width:0;
    height:0;
`;

export const ImgLabel=styled.label`
    width:130px;
    height:30px;

    margin-top:25px;
    margin-left:30px;

    background-color:#FF4141;

    display:flex;
    justify-content:center;
    align-items:center;

    font-family:"Medium";
    color:white;
`;

export const Title=styled.h2`

    margin-top:30px;
    font-family:"Bold";
`;
export const ContentsContainer=styled.div`
    width:100%;
    height:100%;

    box-sizing:border-box;
    padding:50px;

 
`;
export const TextInput=styled.input`
    width:100%;
    height:60px;
    font-size:20px;
    font-family:"Medium";

    border:none;
    border-bottom:2px solid #FF4141;

    box-sizing:border-box;
    padding:0 10px;

    margin-bottom:50px;
`;
export const ContentsInput=styled.textarea`
    resize:none;
    width:100%;
    height:250px;
    border:2px solid #FF4141;

    font-size:15px;
    font-family:"Medium";

    box-sizing:border-box;
    padding:10px;

    margin-bottom:50px;
`;
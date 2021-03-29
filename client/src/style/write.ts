import styled from 'styled-components';

export const Container=styled.div`
    margin-top:10rem;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`;

export const ContainerBox=styled.div`
    width:750px;
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

    transition: transform 0.2s;
    &:active{
        transform:scale(0.9);
        outline:none;
    }

    cursor: pointer;
`;

export const ImageContainer=styled.img`
    width:100%;
    height:400px;
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
    margin-top:1.5rem;
    margin-bottom:.5rem;
    font-family:"Medium";
    font-size:1rem;
`;
export const ContentsContainer=styled.div`
    width:100%;
    height:100%;

    box-sizing:border-box;
    padding:50px;

 
`;
export const TextInput=styled.input`
    width:90%;
    height:2rem;
    font-size:1rem;
    font-family:"Medium";

    border:none;
    border-bottom:1px solid #FF414188;

    box-sizing:border-box;
    padding:0 10px;

    margin:1rem;
`;
export const ContentsInput=styled.textarea`
    resize:none;
    width:90%;
    border:1px solid #FF414188;

    font-size:15px;
    font-family:"Medium";

    box-sizing:border-box;
    padding:10px;
    margin:1rem;

    overflow:hidden;
`;

export const CategoryContainer=styled.select`
width:90%;
height:2.5rem;

margin:1rem;
border:1px solid #FF411488;

box-sizing:border-box;
padding:.5rem;
-webkit-appearance: none;
-moz-appearance: none; 
appearance: none; 
background: url() no-repeat 95% 50%;
`


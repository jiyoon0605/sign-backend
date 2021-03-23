import styled from 'styled-components';

export const Container=styled.div`
    margin-top:60px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`;

export const ContainerBox=styled.div`
    width:1000px;
    height:1200px;

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
    height:400px;
    background-color:grey;

    object-fit:cover;
`

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

    margin:10px;

    background-color:#FF4141;

    display:flex;
    justify-content:center;
    align-items:center;

    font-family:"Medium";
    color:white;
`;

export const TextInput=styled.input`
    margin:10px;
    width:800px;
    height:60px;

    font-size:25px;
    font-family:"Bold";
`
import styled from 'styled-components'
import {Link}from 'react-router-dom';
export const Container=styled.div`
    margin-top:10rem;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`;

export const Title=styled.div`
    font-family:"Bold";
    font-size:35px;
    margin-bottom:50px;
`;

export const InputField=styled.input`
    width:480px;
    height:50px;

    border-radius:10px;
    box-sizing:border-box;
    padding:10px;
    outline:none;
    border:1px solid black;

    font-family:"Medium";
    font-size:14px;

    margin-bottom:12px;

    &:focus{
        box-shadow:2px 2px 3px 0 rgba(0,0,0,0.5);
    }

`;

export const InputEmail=styled(InputField)`
    width:350px;
`;

export const SubmitButton=styled.button`
    width:480px;
    height:60px;
    margin-top:20px;
    background-color:#FF4141;

    font-size:25px;
    color:white;
    font-family:"Medium";

    border:1px solid black;
    border-radius:10px;

    transition: transform 0.2s;
    &:active{
        transform:scale(0.9);
        
    }
`;
export const EmailBtn=styled(SubmitButton)`
    width:120px;
    font-size:14px;
    height:50px;
    margin-left:10px;
`

export const LinkBtn=styled(Link)`
    color:black;
    margin-top:20px;
`;
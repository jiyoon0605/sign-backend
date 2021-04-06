import styled from "styled-components";

export const Container=styled.div`
    margin-top:10rem;
    display:flex;
    flex-direction:column;
    align-items:center;
    @media screen and (max-width:1000px){
        width:100vw;
        overflow-x:hidden;
    }

`;
export const ContainerBox=styled.div`
    width:60rem;
    min-height:200px;
    box-sizing:border-box;
    padding:1rem;
    display:flex;
    flex-direction:column;
    align-items:center;
    @media screen and (max-width:1000px){
        width:auto;
        margin:0 5px;
    }
    margin-bottom:30px;
`;
export const ButtonContainer=styled.div`
    width:100%;
    display:flex;
    justify-content:space-between;
`;
export const Button=styled.button`
    width:28rem;
    height:2rem;
    @media screen and (max-width:1000px){
        width:10rem;
    }

    background-color:black;
    font-family:"Bold";
    color:white;
`;

export const UserDataContainer=styled.div`
   width:100%;
    border:1px solid rgba(0,0,0,0.1);
    box-shadow:2px 2px 3px 0 rgba(0,0,0,0.3);
    border-radius:5px;
    margin-bottom:2rem;
    padding:1rem 0;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;

`;

export const UserName=styled.h3`
    margin:0;
`;
export const UserEmail=styled.p`
    margin:0;
    color:darkgray;
`;
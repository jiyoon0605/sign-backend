import styled from 'styled-components';

export const Container=styled.div`

    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    background-color:#00000011;
`;

export const ContainerBox=styled.div`
    width:750px;
    background-color:white;
    margin-top:10rem;
    border-radius:5px;
    border:none;
    border:1px solid #00000055;

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
    width:90%;
    height:400px;
    margin-left:2rem;
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

    margin:2rem 0;
    margin-left:2rem;

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
    height:3rem;
    font-size:1rem;
    font-family:"Medium";

    border-radius:5px;
    border:none;
    border:1px solid #00000055;

    box-sizing:border-box;
    padding:0 10px;

    margin:1rem;
`;
export const ContentsInput=styled.textarea`
    resize:none;
    width:90%;
    height:8rem;

    border-radius:5px;
    border:none;
    border:1px solid #00000055;

    font-size:15px;
    font-family:"Medium";

    box-sizing:border-box;
    padding:10px;
    margin:1rem;

    overflow:scroll;
`;

export const CategoryContainer=styled.select`
    width:90%;
    height:3rem;

    margin:1rem;
    border-radius:5px;
    border:none;
    border:1px solid #00000055;
    background-color:white;
    option{
        background-color:white;
    }
    

box-sizing:border-box;
padding:.5rem;
-webkit-appearance: none;
-moz-appearance: none; 
appearance: none; 
background: url() no-repeat 95% 50%;
`


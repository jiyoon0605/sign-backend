import styled from 'styled-components';

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
    box-shadow:2px 2px 5px 0 rgba(0,0,0,0.5);

    @media screen and (max-width:1000px){
        width:auto;
        margin:0 5px;
    }
    margin-bottom:30px;
`;
export const InfoBox=styled.div`
    width:100%;
    display:flex;
    cursor:default;
    @media screen and (max-width:1000px){
        width:auto;
        flex-direction:column;
        padding-bottom:3rem;
    }
`;
export const ImgBox=styled.img`
    width:680px;
    height:430px;
    object-fit:cover;
    @media screen and (max-width:1000px){
        width:100vw;
    }
`;
export const TextBox=styled.div`
    margin-left:2rem;
    display:flex;
    flex-direction:column;
    align-items:center;

    box-sizing:border-box;
    padding:0 30px;
    padding:15px;

    position:relative;

    @media screen and (max-width:1000px){
        padding:0;
    }
`;
export const Title=styled.h2`
font-family:"Bold";
`
export const PeriodText=styled.div`
    width:100%;
    height:20px;
    font-family:"Light";
    font-size:10px;
`;
export const ProgressBox=styled.div`
    margin:20px 0;
    width:150px;
    height:150px;

    font-family:"Bold";
`;
export const Message=styled.div`
    margin-top:20px;
    font-family:"Bold";
    color:#ff4141;

`;
export const CurNum=styled.div`
    margin-top:20px;
    font-family:"Medium";
`

export const ApplyBtn=styled.button`
    width:100%;
    height:50px;
    background-color:#ff4141;
    color:white;
    font-family:"Medium";
    border:none;
    position:absolute;
    bottom:20px;
    border-radius:10px;
    outline:none;
    transition: transform 0.2s;
    &:active{
        transform:scale(0.9);
        
    }
    @media screen and (max-width:1000px){
        position:initial;
        width:15rem;
    }
`;

export const ListBox=styled.div`
    width:15rem;
    height:430px;
    box-shadow:2px 2px 5px 0 rgba(0,0,0,0.5);
    margin-left:20px;

    box-sizing:border-box;
    padding:10px;
    padding-top:20px;

    display:flex;
    flex-direction:column;
    align-items:center;

    font-family:"Medium";
    cursor:default;
    @media screen and (max-width:1000px){
        display:none;
    }
`;
export const ScrollContainer=styled.ul`
    padding:0;

    width:100%;
    height:400px;
    overflow-x:hidden;
    overflow-y:scroll;
    list-style:none;

    display:flex;
    flex-direction:column;
    align-items:center;

    margin-top:30px;

`;

export const  ListItem=styled.li`
    margin:5px 10px;

    box-sizing:border-box;
    padding:10px 0;

    width:270px;
    border-top:1px solid rgba(0,0,0,0.1);
    border-bottom:1px solid rgba(0,0,0,0.1);

    font-family:"Medium";

    display:flex;
    justify-content:center;
    align-items:center;
    
`;

export const HeadInfo=styled.div`
    display:flex;
    @media screen and (max-width:1000px){
        flex-direction:column;
        align-items:center;
    }
`;
export const ContentsBox=styled.div`
    width:76rem;
    min-height:30rem;
    box-shadow:2px 2px 5px 0 rgba(0,0,0,0.5);

    box-sizing:border-box;
    padding:2rem;

    @media screen and (max-width:1000px){
        width:100%;
        margin:0 5px;
    }
    margin-bottom:30px;

    position:relative;
`;

export const DeleteButton=styled.button`
    position:absolute;
    right:.3rem;
    bottom:.3rem;

    border:1px solid rgba(0,0,0,0.2);
    padding:.4rem .8rem;
    border-radius:5px;

    background-color:#00000000;
    color:#FF4141;
`


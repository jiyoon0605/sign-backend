import styled from 'styled-components';

export const Container=styled.div`
    width:100vw;
    display:flex;
    margin:0 100px;
    margin-top:100px;
     @media screen and (max-width:1000px){
         margin:100px 0;
     }
`
export const PostContainer=styled.div`
    max-width:1650px;
    display:flex;
    flex-wrap:wrap;
    justify-content:end;

    @media screen and (max-width:1000px){
       justify-content:center;
    }
`;


//postItem
export const ItemContainer=styled.div`
    width:480px;
    height:250px;

    margin:20px;
    box-shadow:2px 2px 3px 0 rgba(0,0,0,0.5);
`;
export const ItemMain=styled.div`
    display:flex;
    width:100%;
    height:180px;
`;
export const ImageContainer=styled.img`
    height:100%;
    width:220px;
    object-fit:cover;
    margin-right:10px;
`;

export const TextBox=styled.div`
width:100%;
height:100%;
display:block;
margin-right:10px;
`
export const Title=styled.h3`
    font-family:"Medium";
    height:30px;
`;
export const Contents=styled.div`
    width:100%;
    height:90px;
    overflow-wrap: break-word;
    word-break: break-all;
    word-wrap: break-word;
    overflow:hidden; 
    text-overflow:ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;

`
export const ItemFooter=styled.div`
    width:100%;
    height:70px;
    box-shadow:-1px -1px 3px 0 rgba(0,0,0,0.5);
    position:relative;
    box-sizing:border-box;
    padding:15px;

`
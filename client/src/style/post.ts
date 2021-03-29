import styled from 'styled-components';


export const Container=styled.div`
    width:100vw;
    height:100rem;
    display:flex;
    flex-direction:column;
    align-items:center;
    margin-top:150px;
    @media screen and (max-width:1000px){
       margin-top:80px;
    }

`;
export const PostContainer=styled.div`
    width:60rem;
    height: 90rem;

    display:flex;
    flex-direction:column;
    align-items:center;

    overflow-y:scroll;
    scrollbar-width: none; 
    box-sizing:border-box;
    padding:10px;

    padding-bottom:30px;

   &::-webkit-scrollbar {
        background-color:rgb(200, 200, 200);
        display: none; 
   }
   &::-webkit-scrollbar-thumb {
        background-color: #FF4141AA;
  }
    @media screen and (max-width:1000px){
       align-items:center;
       width:100%;
    }
`;

export const MenuBox=styled.nav`
    width:60rem;
    height: 5rem;
    font-family:"Medium";
    @media screen and (max-width:1000px){
        width:100vw;
    }
`;
export const SelectButton=styled.select`
    width:5rem;
    height:100%;
    margin-left:1rem;
    padding-left:5px;
    border:none;
    font-size:.8rem;
`;
//
//
//postItem
export const ItemContainer=styled.div`
    cursor: pointer;
    width:55rem;
    height:15rem;

    margin:1rem;
    box-shadow:2px 2px 3px 0 rgba(0,0,0,0.5);

    display:flex;


    background-color:white;

    transition: transform 0.3s;

    &:hover{
        z-index:9;
        box-shadow:3px 3px 8px 0 rgba(0,0,0,0.8);
        transform:scale(1.02);
    }
     @media screen and (max-width:1000px){
         width:20rem;
         height:50rem;
         
         flex-direction:column;
     }
`;
export const ItemMain=styled.div`
    display:flex;
    flex-direction:column;
    width:60rem;
    height:15rem;

    box-sizing:border-box;
    padding:.5rem;

    @media screen and (max-width:1000px){
        width:20rem;
        height:15rem;
         
         flex-direction:column;
     }
`;
export const ImageContainer=styled.img`
    height:100%;
    width:20rem;
    object-fit:cover;
    margin-right:10px;
    @media screen and (max-width:1000px){
        width:100%;
        height:20rem;
    }
`;
export const Title=styled.h3`
    font-family:"Medium";
    margin-bottom:.5rem;
    width:100%;

    overflow:hidden; 
    text-overflow:ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
`;
export const Contents=styled.div`
    margin:1rem;
    height:1.3rem;
    overflow-wrap: break-word;
    word-break: break-all;
    word-wrap: break-word;
    overflow:hidden; 
    text-overflow:ellipsis;
    display: -webkit-box;
    -webkit-line-clamp:1;
    -webkit-box-orient: vertical;

`;

export const DateBox=styled.div`
    display:flex;
`;
export const MenuText=styled.h5`
    margin:0;
    padding:0;
    &::after{
        content:" : "
    }
    margin-right:5px;
`;
export const DateText=styled.h5`
    margin:0;
    padding:0;

    font-weight:100;
`;

//
//
//category
export const CategoryContainer=styled.nav`
    width:70rem;
    height:3rem;
    display:flex;
    justify-content:left;
    align-items:center;
    box-shadow:1px 1px 2px 0 rgba(0,0,0,0.5);
    z-index:10;
    @media screen and (max-width:1000px){
        width:100%;
        overflow:hidden;
        overflow-x:scroll;
    }

`;
export const NavButton=styled.button`
    width:6rem;
    height:100%;
    border:none;
    padding:0 1rem;
    background-color:white;
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:.8rem;
    &:hover{
        background-color:rgb(200,200,200);
    }
    @media screen and (max-width:1000px){
        font-size:.3rem;
    }
`;

export const CategoeyBox=styled.div`
    width:2rem;
    height:1rem;

    display:flex;
    justify-content:center;
    align-items:center;
    background-color:rgb(200,200,200);
    margin-top:1rem;

    box-sizing:border-box;
    padding:.5rem 1.2rem;

    border-radius:5px;

    font-size:.7rem;
    color:white;
`

import styled from 'styled-components';


export const Container=styled.div`
    width:100vw;
    height:150rem;
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
    margin:0 1rem;
    padding-left:5px;
    border:none;
    font-size:.8rem;

    background-color:black;
    color:white;
`;
//
//
//postItem
export const ItemContainer=styled.article`
    position:relative;
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
         height:36rem;
         
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

export const Resultlabel=styled.div`
    position:absolute;
    top:0;
    left:0;
    z-index:10;
    padding:.3rem;

    background-color: #ff4141;
    color: white;
    font-family:"Bold";
`

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
    margin-bottom:5rem;
    background-color:black;
    color:white;
    overflow-x:scroll;
`;

export const NavButton=styled.button`
    width:6rem;
    height:100%;
    border:none;

    margin:.5rem 0;
    /* padding:0 1rem; */

    background-color:black;
    color:white;

    word-break:keep-all;
    
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:.8rem;
    &:hover{
        background-color:rgba(200,200,200,0.5);
    }
    @media screen and (max-width:1000px){
          width:6rem;
        font-size:.8rem;
    }
`;

export const CategoeyBox=styled.div`

    width:3rem;

    display:flex;
    justify-content:center;
    align-items:center;
    background-color:rgb(200,200,200);
    margin-top:1rem;

    box-sizing:border-box;
    padding:.1rem;

    border-radius:5px;

    font-size:.7rem;
    color:white;
    
`;

export const Termination=styled.div`
    width:100%;
    display:flex;
    justify-content:center;
    margin-top:.3rem;
    font-family:"Bold";
    color:#FF4141;
`
//
//
//popularity
export const PopularContainer=styled.div`
    width:70rem;
    height:28rem;
    margin-bottom:5rem;
    
    display:flex;

    @media screen and (max-width:1000px){
        width:100%;
        position:relative;
        flex-direction:column;
    }

`;

export const PopularImg=styled.img`
    height:100%;
    width:55rem;
    object-fit:cover;

    @media screen and (max-width:1000px){
        width:100%;
        height:20rem;
    }
`;

export const PopularInfo=styled.div`
    height:100%;
    width:25rem;
    color:white;
    display:flex;
    flex-direction:column;

    box-sizing:border-box;
    padding:7rem 1rem 0 1rem;
    
    h1{
        color:white;
        width:13rem;
        margin:0;
        overflow-wrap: break-word;
        word-break: break-all;
        word-wrap: break-word;
        overflow:hidden; 
        text-overflow:ellipsis;
        display: -webkit-box;
        -webkit-line-clamp:2;
        -webkit-box-orient: vertical;
    }
    background-color:#000000;

    @media screen and (max-width:1000px){
        width:100%;
        height:15rem;
        padding:0;
        padding-left:1rem;
        padding-bottom:1rem;
    }
`;


//
//
//footer
export const FooterContainer=styled.footer`
    margin-top:10rem;
    width:100vw;
    height:15rem;
    box-shadow:-1px -1px 2px 0 rgba(0,0,0,0.5);
    background-color:black;
`;


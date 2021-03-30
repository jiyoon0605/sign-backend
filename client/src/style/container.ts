import styled from 'styled-components'

export const Header=styled.header`

    box-sizing:border-box;
    padding:0 100px;

    background-color:white;
    position:fixed;
    top:0;
    left:0;
    right:0;

    height:80px;
    display:flex;
    justify-content:space-between;
    align-items:center;

    @media screen and (max-width:1000px){
        margin:0;
        padding:0;
    }

    .link{
        text-decoration:none;
        color:black;
    }
    z-index:99;

    border-bottom:1px solid rgba(0,0,0,0.2);
`
export const Logo=styled.div`
    margin-left:1rem;
    font-family:"JSArirang";
    font-size:3rem;
    cursor: pointer;
`
export const NavList=styled.ul<{isMenuOpened:boolean}>`
    display:flex;
    list-style:none;
    text-align:center;
    i{
        display:none;
    }

    @media screen and (max-width:1000px){
        margin-right:2rem;
     i{
         margin-top:0.5rem;
        display:block;
        font-size:2rem;
        margin-bottom:1rem;
        
    }
        height:${({isMenuOpened})=>isMenuOpened?"10rem":"2.5rem"};
        transition: width 1s, height 0.5s;
        overflow-y:hidden;
        position:absolute;
        right:0;
        top:0;
        flex-direction:column;
        text-align:right;

        padding:0;
    }
`
export const NavItem=styled.li`
    width:90px;
    font-family:"Medium";
    margin:0 20px;
    cursor: pointer;
    background-color:white;
    @media screen and (max-width:1000px){
        width:100px;
        margin-right:5px;
        border-bottom:1px solid #000000;
        box-sizing:border-box;
        padding:5px;
        outline:1px solid #000000;
        outline-bottom:1px solid #00000055
    }
`

export const Container=styled.main`
    width:100vw;
    margin:0;
    padding:0;
`
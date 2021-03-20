import styled from 'styled-components'

export const Header=styled.header`
    margin:0 100px;
    margin-top:10px;

    height:80px;
    display:flex;
    justify-content:space-between;

    @media screen and (max-width:700px){
        margin:0;
        margin-top:10px;
        width:100vw;
    }

    .link{
        text-decoration:none;
        color:black;

    }

`
export const Logo=styled.div`
    font-family:"JSArirang";
    font-size:50px;
    cursor: pointer;
`
export const NavList=styled.ul`
    display:flex;
    list-style:none;
`
export const NavItem=styled.li`
    font-family:"Medium";
    margin:0 20px;
    cursor: pointer;
`
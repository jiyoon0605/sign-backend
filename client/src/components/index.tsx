import React from 'react'
import {Switch,Route,Link}from 'react-router-dom'
import {useHistory}from 'react-router';
import Register from 'components/register';
import Login from 'components/login';
import * as S from 'style/container'
const Container:React.FC=()=>{
    const history=useHistory()
    return(
        <>
            <S.Header>
                <S.Logo>
                    <Link className="link" to="/">Sign!</Link>
                </S.Logo>
                <S.NavList>
                    <S.NavItem>전체 게시물</S.NavItem>
                    <S.NavItem>글쓰기</S.NavItem>
                    <S.NavItem onClick={()=>history.push("/login")}>로그인</S.NavItem>
                </S.NavList>
            </S.Header>
            <Switch>
                <Route path="/register" component={Register}/>
                <Route path="/login"component={Login}/>
            </Switch>
        </>

    )

}

export default Container;
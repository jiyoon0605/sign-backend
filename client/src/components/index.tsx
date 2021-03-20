import React from 'react'
import {Switch,Route,Link}from 'react-router-dom'
import Register from 'components/register/index';
import * as S from 'style/container'
const Container:React.FC=()=>{
    return(
        <>
            <S.Header>
                <S.Logo>
                    <Link className="link" to="/">Sign!</Link>
                </S.Logo>
                <S.NavList>
                    <S.NavItem>전체 게시물</S.NavItem>
                    <S.NavItem>글쓰기</S.NavItem>
                    <S.NavItem>로그인</S.NavItem>
                </S.NavList>
            </S.Header>
            <Switch>
                <Route path="/signin" component={Register}/>
            </Switch>
        </>

    )

}

export default Container;
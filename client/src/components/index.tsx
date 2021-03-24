import React,{useEffect } from 'react'
import {Switch,Route,Link}from 'react-router-dom'
import {useHistory}from 'react-router';
import Register from 'components/register';
import Login from 'components/login';
import Write from 'components/write'

import * as S from 'style/container';



import {useDispatch}from 'react-redux';
import Post from 'components/post';

const Container:React.FC=()=>{
    const history=useHistory();

    return(
        <>
            <S.Header>
                <S.Logo>
                    <Link className="link" to="/">Sign!</Link>
                </S.Logo>
                <S.NavList>
                    <S.NavItem onClick={()=>history.push("/post")}>전체 게시물</S.NavItem>
                    <S.NavItem onClick={()=>history.push("/write")}>글쓰기</S.NavItem>
                    <S.NavItem onClick={()=>{
                        if(localStorage.getItem("accessToken")){
                            localStorage.removeItem("accessToken");
                        }
                        history.push("/login");
                        }}>
                            {localStorage.getItem("accessToken")?"로그아웃":"로그인"}
                    </S.NavItem>
                </S.NavList>
            </S.Header>
         
            <Switch>
                <Route path="/register" component={Register}/>
                <Route path="/login"component={Login}/>
                <Route path="/write"component={Write}/>
                <Route path="/post"component={Post}/>       
            </Switch>

        </>

    )

}

export default Container;
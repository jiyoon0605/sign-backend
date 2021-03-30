import React,{useEffect, useState } from 'react'
import {Switch,Route,Link}from 'react-router-dom'
import {useHistory}from 'react-router';
import Register from 'components/register';
import Login from 'components/login';
import Write from 'components/write'

import * as S from 'style/container';

import {logoutRequest}from 'modules/login'
import {userDataRequest, userDataReset}from 'modules/userData';
import {useDispatch, useSelector}from 'react-redux';
import { RootState} from 'modules';
import Post from 'components/post';
import PostDetail from 'components/postDetail';

const Container:React.FC=()=>{
    const history=useHistory();
    const dispatch = useDispatch();
    const state=useSelector((state:RootState)=>state.userDataReducer);
    const loginState=useSelector((state:RootState)=>state.loginReducer);
    const [text,setText]=useState("로그인");
    const [isMenuOpened,setIsmenuOpened]=useState(false);

    useEffect(() => {
        if(localStorage.getItem("accessToken")) dispatch(userDataRequest());
        else dispatch(userDataReset());
    
    }, [dispatch]);

    useEffect(() => {
        history.push("/post");
    }, [history]);

    useEffect(() => {
        if(localStorage.getItem("accessToken"))setText("로그아웃");
        else setText("로그인");
    }, [state,loginState]);


    return(
        <>
            <S.Header>
                <S.Logo>
                    <Link className="link" to="/post">Sign!</Link>
                </S.Logo>
               
                <S.NavList isMenuOpened={isMenuOpened}>
                <i className="fas fa-bars" onClick={()=>setIsmenuOpened(!isMenuOpened)}></i>
                    <S.NavItem onClick={()=>history.push("/post")}>전체 게시물</S.NavItem>
                    <S.NavItem onClick={()=>history.push("/write")}>글쓰기</S.NavItem>
                    <S.NavItem onClick={()=>{
                        if(localStorage.getItem("accessToken")){
                            alert("로그아웃 되었습니다")
                            dispatch(userDataReset());
                            dispatch(logoutRequest());
                        }else{
                            history.push("/login");
                        }
                        }}>
                            {text}
                    </S.NavItem>
                </S.NavList>
            </S.Header>
        <S.Container>
            <Switch>           
                <Route exact path="/post"component={Post}/>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/login"component={Login}/>
                <Route exact path="/write"component={Write}/>
                <Route exact path="/post/:id" component={PostDetail}/>
            </Switch>
        </S.Container>
            

        </>

    )

}

export default Container;
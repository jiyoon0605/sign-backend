import React from 'react';
import {BrowserRouter as Route}from "react-router-dom";
import Container from './components';
import {createGlobalStyle}from 'styled-components';
import {Provider}from 'react-redux';
import store from 'store';

const GlobalStyle=createGlobalStyle`
  margin:0;
  padding:0;
  @font-face {
    font-family: 'JSArirang';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/JSArirang-RegularA1.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
     font-family: 'Medium';
     src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-5Medium.woff') format('woff');
     font-weight: normal;
     font-style: normal;
  }
  @font-face {
     font-family: 'Light';
     src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-3Light.woff') format('woff');
     font-weight: normal;
     font-style: normal;
  }
  @font-face {
     font-family: 'Bold';
     src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-9Black.woff') format('woff');
     font-weight: normal;
     font-style: normal;
    }
`

function App() {
  return (
    <div className="App">
      <GlobalStyle/>
      <Provider store={store}>
        <Route>
          <Container/>
        </Route>
      </Provider>

      
    </div>
  );
}

export default App;

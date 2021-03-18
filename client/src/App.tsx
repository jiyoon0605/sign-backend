import React from 'react';
import {BrowserRouter as Route}from "react-router-dom"
import Container from './components';

function App() {
  return (
    <div className="App">
      <Route>
        <Container/>
      </Route>
      
    </div>
  );
}

export default App;

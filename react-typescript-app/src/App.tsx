import React from 'react';
import logo from './logo.svg';
import './App.css';
import MyHeader from "./MyHeader";
import Form from "./Form";
import TheQuestion from "./TheQuestion";
// @ts-ignore




function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MyHeader name={"Developer"}/>;
        <Form/>
        <TheQuestion/>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

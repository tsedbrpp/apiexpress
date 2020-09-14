import React from 'react';
import logo from './logo.svg';
import './Entry.css';
import MyHeader from "./MyHeader";
import Form from "./Form";
import TheQuestion from "./TheQuestion";
// @ts-ignore




function Entry() {
  return (
    <div className="App">
      <img src={"https://a.storyblok.com/f/92556/751x960/896657faf2/monkey.jpg"}/>
      <header className="App-header">
        <MyHeader name={"Developer"}/>;
        <Form/>
        <TheQuestion/>

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

export default Entry;

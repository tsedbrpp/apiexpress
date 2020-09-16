import React from 'react';
import logo from './logo.svg';
import './Entry.css';
import MyHeader from "./components/MyHeader";
import Form from "./components/Form";
import TheQuestion from "./components/TheQuestion";
import TheConclusion from "./components/Conclusion"
// @ts-ignore




function Entry() {
  return (
    <div className="App">

      <header className="App-header">
        <MyHeader name={"Developer"}/>;
        <Form/>
        <TheQuestion/>
        <TheConclusion></TheConclusion>

      </header>
    </div>
  );
}

export default Entry;

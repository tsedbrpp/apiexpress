import React, { useState } from "react"
import logo from '../logo.svg';
import './Entry.css';
import MyHeader from "./MyHeader";
import Form from "./Form";
import TheQuestion from "./TheQuestion";
import TheConclusion from "./Conclusion"
import ButtonSelector from "./ButtonSelector"
import AnObject from "../AnObject"
// @ts-ignore



function Entry() {

  const [showQ, setShowQ] = useState(true);

  return (
    <div className="App">

      <header className="App-header">
        <MyHeader name={"Developer"}/>;
        <ButtonSelector  QSetter={setShowQ}/>
        <TheQuestion show={showQ} />
        <TheConclusion QSetter={setShowQ}></TheConclusion>

      </header>
    </div>
  )
}

export default Entry;

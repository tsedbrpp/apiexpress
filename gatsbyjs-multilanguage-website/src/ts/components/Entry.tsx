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
  const [showC, setShowC] = useState(false);
  const [conclusions, setConclusions] = React.useState<Array<AnObject>  >([]);
  if(showQ){
    return (
    <div className="App">
    <header className="App-header">
      <MyHeader name={"Developer"}/>;
      <ButtonSelector ConclusionSetter={setConclusions} QSetter={setShowQ} CSetter={setShowC}/>
      <TheQuestion show={showQ} />
    </header>
    </div>)

  }
 else
  return (
    <div className="App">

      <header className="App-header">
        <MyHeader name={"Developer"}/>;
        <ButtonSelector ConclusionSetter={setConclusions} QSetter={setShowQ} CSetter={setShowC}/>
        <TheConclusion conclusions={conclusions} ></TheConclusion>

      </header>
    </div>
  )
}

export default Entry;


import * as React from 'react';

import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import { Button } from "@material-ui/core"
import ModelUpper from "../ModelUpper"
import AnObject from "../AnObject"
import useStyles from "../MakeStyles"
import { useState } from "react"



const handleClick = async (kb:string) => {

  ModelUpper.ResetKB(kb)


  let modelUpper = ModelUpper.GetInstance();
  try {
    await modelUpper.pursue();
    let conclude = await ModelUpper.GetInstance().getConclusions();
    ConclusionSetter(conclude);
  }
  catch(error){
    console.log( error +  "  caught error incrementing count")


  }
}
const consult = async (count:number,setCount: React.Dispatch<React.SetStateAction<number>> ,QSetter:React.Dispatch<React.SetStateAction<boolean>>,CSetter:React.Dispatch<React.SetStateAction<boolean>>,ConclusionSetter: React.Dispatch<React.SetStateAction<Array<AnObject>>>) =>
{  await ConclusionSetter([]);
  QSetter(true);
  console.log("setting queestion to true")
  CSetter(false);


  await handleClick(ConclusionSetter)
  QSetter(false);
  CSetter(true);



}
const  ButtonSelector:  React.FunctionComponent<myInterface> = (props:myInterface) => {
  const SetShowQ: React.Dispatch<React.SetStateAction<boolean>> = props.QSetter ;
  const SetShowC: React.Dispatch<React.SetStateAction<boolean>> = props.CSetter ;
  const ConclusionSetter:React.Dispatch<React.SetStateAction<Array<AnObject>>> = props.ConclusionSetter ;

  const [count, setCount] = useState(0);
  return (
    <div>

      <Button variant="contained" color="secondary" onClick={() => consult(count,setCount,SetShowQ,SetShowC,ConclusionSetter)}>
        New Consultation
      </Button>

    </div>
  )
}

export default ButtonSelector

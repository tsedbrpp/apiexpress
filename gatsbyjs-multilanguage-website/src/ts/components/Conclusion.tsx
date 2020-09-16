import React, {useEffect,useReducer} from 'react';
import * as ReactDOM from 'react-dom'
import ModelUpper from "../ModelUpper";
import useStyles from "../MakeStyles";
import modelReducer, { IStateReducerForm, IActionState, REQUEST_STATUS, RESPONSE } from "../../reducers/ModelReducer"
import AskAnswer from "../AskAnswer"
import AnObject from "../AnObject"
import ConItem from "./ConItem"
const initialState:IStateReducerForm = {
  records:[],
  status: REQUEST_STATUS.LOADING,
  error: null
}


// @ts-ignore
const  TheConclusion: React.FC = () => {
  const classes = useStyles();

  const [conclusions, setConclusions] = React.useState<Array<AnObject> | null >(null);

  useEffect(() => {
   if(!conclusions) {
     getConclusions();
    }
  },[])

 const getConclusions = async() => {
    let conclude = await ModelUpper.GetInstance().getConclusions();
    setConclusions(conclude);
 }

if(!conclusions) {
  return <div>waiting</div>
}
else {
   return <div>
     <ConItem name={conclusions} call={"theere"}></ConItem>
    </div>
  /* (
 /!* conclusions?.map( item =>
  { console.log("item " + item.Name);
  <div> hello
     </div>*!/
  }))*/
}


}

export default TheConclusion;

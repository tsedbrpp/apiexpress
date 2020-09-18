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
interface myInterface {
   conclusions: Array<AnObject>
}

// @ts-ignore
const TheConclusion: React.FunctionComponent<myInterface> = (props: myInterface) => {

  const classes = useStyles();

 // const [conclusions, setConclusions] = React.useState<Array<AnObject> | null >(null);

 /* useEffect(() => {
   if((props.conclusions.length === 0)) {
     getConclusions();
    }
  },[])*/

/* const getConclusions = async() => {
    let conclude = await ModelUpper.GetInstance().getConclusions();
    props.ConclusionSetter(conclude);

 }*/

if(props.conclusions.length === 0)
  return <div>waiting</div>

else {
         let con = [...props.conclusions]


   return <div>
     <ConItem name={con} call={"theere"}></ConItem>
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

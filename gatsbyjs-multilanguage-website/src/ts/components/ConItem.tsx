import * as React from 'react';
import AnObject from "../AnObject"
interface myInterface {
  name: Array<AnObject>
  call:string;
}

const ConItem: React.FunctionComponent<myInterface> = (props: myInterface) => {
 return (
   <div>
     {console.log("in conItem")}
  <h1>Hola, {props.call}! </h1>
   <ul>
     {props.name.map( item => <li>{item.Name}</li> )}
   </ul>
 <div>testing</div>
 </div>
)}

export default ConItem;

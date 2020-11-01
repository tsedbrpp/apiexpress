import * as React from 'react';
import AnObject from "../AnObject"
interface myInterface {
  name: Array<AnObject>
  call:string;
}

const ConItem: React.FunctionComponent<myInterface> = (props: myInterface) => {
 return (
   <div>

  <h1>Hola, {props.call}! </h1>
   <ul>
     {props.name.map( item => <li key={item.Name}>{item.Name} {item.PrintValues()}</li> )}
   </ul>
 <div>testing</div>
 </div>
)}

export default ConItem;

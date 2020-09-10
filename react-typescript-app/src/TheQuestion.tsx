import * as React from 'react';
import * as ReactDOM from 'react-dom'
import ModelUpper from "./ModelUpper";
import QuestionState from "./QuestionState";
import AskAnswer from "./AskAnswer";

function answerQuestion(answer:string ) {
  ModelUpper.GetInstance().getMyAsk().answer(answer);
}
const  TheQuestion: React.FC = () => {
    const [state,setState] = React.useState<QuestionState>();
   // const refContainer  = React.useRef<HTMLElement>(null);
    AskAnswer.SetTheStateState(setState);
   return <div>
    <div className="commentForm" >
       {state?.name}</div>

       <div> {state?.legals.map(i =><span>
           <button
               className="button"
               value = {i}
               onClick={ e => answerQuestion(i)}
           >{i}</button></span>)} </div>

      </div>


}
export default TheQuestion;






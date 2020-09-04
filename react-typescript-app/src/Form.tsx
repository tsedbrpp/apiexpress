import * as React from 'react';
import * as ReactDOM from 'react-dom'
import ModelUpper from "./ModelUpper";


interface State{
    name:String
}
interface Props{

}

const  Form: React.FC = () => {
    const [state,setState] = React.useState<State>();
    const refContainer  = React.useRef<HTMLInputElement>(null);
    const handleSubmit= async (e: React.FormEvent) => {
        e.preventDefault();
        let input = refContainer.current;  //ReactDOM.findDOMNode(this.refs["name"]) as HTMLInputElement;
        if (null !== input) {
            console.log(input.value)
            setState({
                name: input.value

            })
            let modelUpper = ModelUpper.GetInstance();
            await modelUpper.pursue();
        }
    }

    return <form className="commentForm" onSubmit={ e => handleSubmit(e) }>
        <input type="text" placeholder="Your name" ref={refContainer} />
        <button type="submit" >Submit</button>
        {state?.name}
    </form>;
    }

    export default Form;



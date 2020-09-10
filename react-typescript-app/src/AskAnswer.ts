import AnObject from "./AnObject";
import * as React from "react";
import QuestionState from "./QuestionState";
import {Dispatch} from "react";

export default class AskAnswer {
  public key = [
    { id: "body", value: "hairy" },
    { id: "lift", value: "yes" },
    { id: "run", value: "fast" },
    { id: "eat", value: "lots" },
    { id: "convertO2", value: "breaths" },
  ];

  private selection:string = '';
  // @ts-ignore
  private static SetState: React.Dispatch<React.SetStateAction<QuestionState | undefined>>;
  // @ts-ignore
  public static SetTheStateState(mySetState:  React.Dispatch<React.SetStateAction<QuestionState | undefined>> ) {

    AskAnswer.SetState = mySetState;
 }




  public async Ask(anObject: AnObject): Promise<string> {
    let textOfQuestion = anObject.TheQuestion.TextOfQuestion;
    console.log("question" + textOfQuestion);
    let legalList = anObject.TheQuestion.LegalList;
    AskAnswer.SetState({
      name: textOfQuestion,
      legals: legalList
    })

    //  legalList.forEach((legalValue) => console.log(legalValue + " : "));
    // Get two properties from the user: the `username` and `email`.
    //   const { answer } = await get([textOfQuestion]);
    // Get two properties from the user: the `password` and `food`.
    //let p = Promise.resolve('success').then( () => this.key[anObject.Name])
   return await this.poll(3000,5)
   /* let obj = this.key.find((obj) => obj.id == anObject.Name);
    // @ts-ignore
    console.log("returning in five sec " + obj.value);
    /!*return obj.value;*!/
    return new Promise((resolve) => {
      setTimeout(() => {
        // @ts-ignore
        resolve(obj.value);
      }, 2000);
    });*/
  }
    public  async poll ( interval:number, maxAttempts:number ):Promise<string> {
        let attempts = 0;

        const executePoll = async (resolve: (arg0: any) => any, reject: (arg0: Error) => any) => {

            attempts++;

            if (this.selection) {
                return resolve(this.selection);
            } else if (maxAttempts && attempts === maxAttempts) {
                return reject(new Error('Exceeded timeout attempts'));
            } else {
                setTimeout(executePoll, interval, resolve, reject);
            }
        };
              this.selection = '';
        return new Promise(executePoll);
    };


  public  answer(selection : string ): void {
      this.selection = selection;
      console.log( "**********************got selected" + selection);
  }
}

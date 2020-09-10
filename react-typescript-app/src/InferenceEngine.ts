import KnowledgeBase from "./KnowledgeBase";
import Nodes from "./Nodes";
import { QuestionType } from "./Question";
import LogicSet from "./LogicSet";


export default class InferenceEngine {
  _pursued: boolean = false;
  _solved: boolean = false;
  public static Goal: string;
  public Kb: KnowledgeBase | undefined;
  // @ts-ignore
  public Nodes: Nodes;

  public GetSolved(): boolean {
    return this._solved || this._pursued;
  }

  public SetSolved(aValue: boolean): void {
    this._solved = aValue;
  }

  public Reset(): void {
    this.Nodes.Reset();
  }

  public GetNodes(): Nodes {
    return this.Nodes;
  }

  public async BackwardChain(
    anObjectName: string

    //
  ): Promise<boolean> {
    let currentObject = this.Nodes.FindObject(anObjectName);
    console.log("trying to solve" + anObjectName);
    if (!currentObject) {
      console.log("warning making object = " + anObjectName);
      currentObject = this.Nodes.MakeNode(QuestionType.Regular, anObjectName);
    }
    // currentObject.PrintValues();
    if (!currentObject.Sought) {
      console.log("seeking object " + currentObject.Name);
      this._solved = false;
      currentObject.FlipSought();
      // @ts-ignore
      let rules = this.Kb.FindRules(anObjectName);
      //  let currentRule = null;
      for (let aRule of rules) {
        let fails = false;
        let currentRule = aRule;

        let len = currentRule.MyLogic.length;

        for (let i = 0; i < len; i++) {
          let result = await this.TestUm(currentRule.MyLogic[i]);
          if (result === false) fails = true;
        }

        /*for (let logic of aRule.MyLogic) {
          console.log("working on " + logic.toString());
          let bool = await this.TestUm(logic);
          console.log("back from testum await " + bool);
          if (bool) {
            console.log("continue " + logic.toString());
            continue;
          }
          fails = true;
          console.log("fail and breaking" + logic.toString());
          break;
        }*/
        if (!fails) {
          this.Nodes.Conclude(aRule, aRule.Cons, aRule.myName, aRule.HasElse());
          this._solved = true;
          if (!currentObject.PursueAll) break;
          this._pursued = true;
        }
      }
      if (!this._solved && !(currentObject.Name === InferenceEngine.Goal)) {
        let anObject = this.Nodes.FindObject(currentObject.Name);
        if (anObject != null) {
          // let theQuestion = anObject.TheQuestion;
          let ask = await anObject.Ask();

          return true; // new Promise(() => true);
        }
      }
    }
    console.log("returning true for " + anObjectName);
    return true; //new Promise(() => true);
  }

  public async TestUm(logic: LogicSet): Promise<boolean> {
    if (logic.isEmpty()) return true;
    switch (logic.Tag) {
      case "O":
        for (const aPair of logic.PairList) {
          await this.BackwardChain(aPair.TheObject);
          if (this.Nodes.Test(aPair.TheObject, aPair.TheValue)) return true; // one passed
        }
        return false;
      case "A":
        for (const aPair of logic.PairList) {
          await this.BackwardChain(aPair.TheObject);

          let bool = this.Nodes.Test(aPair.TheObject, aPair.TheValue);
          if (!bool) return false;
        }
        return true; // all passed

      case "N": //not and
        for (const aPair of logic.PairList) {
          await this.BackwardChain(aPair.TheObject);
          if (this.Nodes.Test(aPair.TheObject, aPair.TheValue)) return false; // one was true
        }
        return false; // all were  not passed

      default:
        throw Error("inference engine bad tag " + logic.Tag);
    }
  }
}

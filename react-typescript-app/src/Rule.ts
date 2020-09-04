import LogicSet from "./LogicSet";
import OvPair from "./OvPair";
import Outputer from "./Outputer";
import Statement from "./Statement";
import Logic from "./Logic";
import { StatementForm } from "./Statement";
import Nodes from "./Nodes";

export default class Rule {
  myName: string;
  ParsedOk: boolean;
  Reference: string;
  MyLogic: Array<LogicSet>;
  Cons: Array<OvPair>;
  Elses: Array<OvPair>;
  Output: Outputer;

  public FindLogicSet(tag: string): LogicSet | undefined {
    if (!Logic.CreateNewLogic) {
      let filtered = this.MyLogic.filter(
        (logicSet) => logicSet.Equals(tag) && !logicSet.Seal
      );
      if (filtered.length == 1) {
        filtered[0].Seal = true;
        return filtered[0];
      } else {
        Logic.CreateNewLogic = false;
        let aSet = new LogicSet(tag);
        this.MyLogic.push(aSet);
        return aSet;
      }

    }
  }
  public constructor(
    aName: string,
    aReference: string,
    premises: Array<StatementForm>,
    conclusions: Array<StatementForm>
  ) {
    this.ParsedOk = true;
    this.myName = aName;
    this.Reference = aReference;
    this.Cons = [];
    this.MyLogic = [];
    this.Elses = [];
    this.Output = new Outputer();

    if (!this.MakePremises(aName, premises)) this.ParsedOk = false;

    if (!this.MakeConclusions(conclusions)) this.ParsedOk = false;
  }
  public MakePremises(aName: string, premises: Array<StatementForm>): boolean {
    let logicSet: LogicSet | undefined;
    Logic.ContainsPrior = false;
    premises.forEach((aPremise) => {
      let currentStatement = new Statement(aPremise);

      if (Logic.ContainsPrior) {
        let prior = Logic.GetPriorStatement(currentStatement);
        Logic.setPrior(currentStatement);
        // @ts-ignore
        let aPair = prior.aPair;
        if (aPair == undefined  || null) {
          throw new Error("null in makePremises");
        }
        // @ts-ignore
        switch (prior.tag[<any>"logic"]) {
          case "O":
            // @ts-ignore
            logicSet = this.FindLogicSet("O");
            if (logicSet == null) {
              throw new Error("Rules error or");
            }

            logicSet.Add(aPair);

            break;
          case "N":
            // @ts-ignore
            logicSet = this.FindLogicSet("N");
            if (logicSet == null) {
              throw new Error("Rules error not");
            }

            logicSet.Add(aPair);
            break;
          case "A":
            // @ts-ignore
            logicSet = this.FindLogicSet("A");
            if (logicSet == null) {
              throw new Error("Rules error and");
            }
            logicSet.Add(aPair);
            break;
          default:
            throw new Error("Rules Default switch");
        }
      } else {
        Logic.setPrior(currentStatement);
      }
    });
    let lastStatement = Logic.getPrior();
    let aLastPair = lastStatement.aPair;
    if (aLastPair.isNull()) {
      throw new Error("Rules Default switch");
    }
    switch (lastStatement.tag[<any> "logic"]) {
      case "O":
        logicSet = this.FindLogicSet("O");
        //   System.out.println("adding or last" + aPair.printString());
        // @ts-ignore
        logicSet.Add(aLastPair);
        break;
      case "N":
        logicSet = this.FindLogicSet("N");
        //  System.out.println("adding not last" + aPair.printString());
        // @ts-ignore
        logicSet.Add(aLastPair);
        break;
      case "A":
        logicSet = this.FindLogicSet("A");
        // @ts-ignore
        logicSet.Add(aLastPair);
        //  System.out.println("adding and last" + aPair.printString());

        break;
      default:
        throw new Error("Rules bad tag in make premise" + lastStatement.tag);
    } // end for
    return true;
  }

  private MakeConclusions(conclusions: Array<StatementForm>): boolean {
    conclusions.forEach((conclusion) => {
      let aStatement = new Statement(conclusion);

      let aPair = aStatement.aPair;

      if (aPair.isNull()) {
        throw new Error("rules make conclusion a pair= null");
      }
      switch (aStatement.tag[<any>"logic"]) {
        case "E":
          this.Elses.push(aPair);
          break;
        case "A":
          this.Cons.push(aPair);
          break;
        default:
          throw new Error("Rules bad tag in make conclusion " + aStatement.tag);
      }
    });

    return true;
  }

  public Equals(aName: string): boolean {
    return this.myName == aName;
  }
  public GetRuleConclusions(aName: string): Array<OvPair> {
    let filtered = this.Cons.filter((ovPair) => {
      ovPair.objectEquals(aName);
    });
    return filtered;
  }

  public Concludes(aName: string): boolean {
    return this.Cons.some((ovPair) => ovPair.objectEquals(aName));
  }

  public printPairs(whatString: string, pairs: Array<OvPair>) {
    let first = true;
    let accum = "";
    let filterPairs = pairs.filter((ovPair) => ovPair);
    filterPairs.forEach((aPair) => {
      if (!first || !(whatString == "And"))
        accum += whatString + " " + aPair.toString();
      else {
        first = false;
        accum += aPair.toString();
      }
    });

    Outputer.Update(accum);
  }

  public Print(): string {
    Outputer.Reset();
    this.PrintPremises();
    this.PrintConclusion();
    Outputer.Update("<REFERENCE>\n" + this.Reference + "\n");
    Outputer.Update("<END>\n");
    return Outputer.Result;
  }
  public PrintPremisesString(): string {
    Outputer.Reset();
    this.MyLogic.forEach((logicSet) => {
      Outputer.Update(logicSet.toString());
    });
    return Outputer.Result;
  }

  public PrintPremises(): void {
    Outputer.Update("<RULE>\n" + this.myName + "\n");
    Outputer.Update("<IF>\n");
    this.MyLogic.forEach((logicSet) => {
      Outputer.Update(logicSet.toString());
    });
  }

  public PrintConclusionString(): string {
    Outputer.Reset();

    this.printPairs("AND", this.Cons);
    if (this.Elses.length > 0) {
      Outputer.Update("ELSE ");
      this.printPairs("", this.Elses);
    }
    return Outputer.Result;
  }

  public PrintConclusion(): string {
    Outputer.Update("<THEN>\n");
    this.printPairs("AND", this.Cons);
    if (this.Elses.length > 0) {
      Outputer.Update("ELSE ");
      this.printPairs("AND", this.Elses);
    }
    return Outputer.Result;
  }

  public FindCert(theNodes: Nodes): number {
    let max = 101;
    this.MyLogic.forEach((aSet) => {
      let cert = aSet.FindCert(theNodes);
      if (cert < max) max = cert;
    });

    return max;
  }

  public HasElse(): boolean {
    return this.Elses.length != 0;
  }
}

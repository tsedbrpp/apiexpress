// @ts-ignore
import editJsonFile from "edit-json-file";
import AnObject from "./AnObject";
import Nodes from "./Nodes";
import KnowledgeBase from "./KnowledgeBase";
import { StatementForm } from "./Statement";
import Rule from "./Rule";
import foo from "./foo.json"
import pem from "./pem.json"
import {QuestionType} from "./Question";
export default class CreateJSON {
  public createObject() {
    // this.createSpreadSheetFile();
    // this.createTheObjects();
  }

 public createSpreadSheetFile(): void {
    let parser = new (require("simple-excel-to-json").XlsParser)();
    let doc = parser.parseXls2Json("./example/sample.xlsx", { isNested: true });
    console.log(doc[0]);
    let file: editJsonFile.JsonEditor;
    file = editJsonFile(`${__dirname}/foo.json`, {});
    // If the file doesn't exist, the content will be an empty object by default.
    // let file = editJsonFile(`${__dirname}/foo.json`);
    let object = doc[0];
    file.set("data", object);
    file.save();
  }

  public createSpreadSheetPremiseCon(): void {
    let parser = new (require("simple-excel-to-json").XlsParser)();
    let doc = parser.parseXls2Json("./example/sample.xlsx", { isNested: true });
    console.log(doc[1]);
    let file: editJsonFile.JsonEditor;
    file = editJsonFile(`${__dirname}/pem.json`, {});
    // If the file doesn't exist, the content will be an empty object by default.
    // let file = editJsonFile(`${__dirname}/foo.json`);
    let object = doc[1];
    file.set("rules", object);
    file.save();
  }



  public createTheObjects(objectLocation: string): Nodes {
    /*let file: editJsonFile.JsonEditor;
    file = editJsonFile(`${__dirname}/${objectLocation}`, {
      autosave: true,
    });*/
    // let fileString = file.toObject();
    let result = foo.data;
    let myNodes = new Nodes();
    // @ts-ignore
    result.forEach((theObject) => {
      let type = theObject["type"] as unknown as QuestionType;
      let theName: string = theObject["text"];
      let qText: string = theObject["question"];
      let eText: string = theObject["reference"];
      let goal: string = theObject["goal"];
      let legals: Array<string> = this.getLegalArray(theObject);
      let filterLegals = legals.filter((item) => item);
      let anObject;
      if (goal) {
        const argsArray = goal.split(" ");
        anObject = new AnObject(
          type,
          theName,
          qText,
          eText,
          filterLegals,
          parseInt(argsArray[1]),
          true
        );
      } else {
        anObject = new AnObject(type, theName, qText, eText, filterLegals);
      }
      myNodes.push(anObject);
    });
    return myNodes;
  }
  private getLegalArray(theObject: any): Array<string> {
    let legals = theObject["legals"];
    let legalValues: Array<string> = [];
    // @ts-ignore
    legals["option"].forEach((aValue) => {
      legalValues.push(aValue["value"]);
    });
    return legalValues;
  }

  public createTheRules(jsonRuleLocation: string): KnowledgeBase {
    let premises = [] as Array<StatementForm>;
    let conclusions = []as Array<StatementForm>;
   // let file: editJsonFile.JsonEditor;
    let rulesList = [];
   // file = editJsonFile(`${__dirname}/${jsonRuleLocation}`, {});
  //  let rulesArray = file.get("rules");
    let rulesArray = pem.rules;
    let workingRule = 1;
    let length = rulesArray.length; //
    let i = 0; //
    while (i < length) {
      //
      let aRulePart = rulesArray[i];
      i++;
      ////rulesArray.forEach((aRulePart) => {
      let workingOn = aRulePart["rule"];
      if (workingRule == workingOn) {
        let ruleType = aRulePart["type"];
        if (ruleType == "premise") {
          let statementPart = aRulePart["statements"];
          let statement = statementPart["statement"];
          // @ts-ignore
          premises.push(statement);
        }
        if (ruleType == "conclusion") {
          let statementPart = aRulePart["statements"];
          let statement = statementPart["statement"];
          // @ts-ignore
          conclusions.push(statement);
          if (i == length) {
            // @ts-ignore
            // @ts-ignore
            let aNewRule = this.makeRule(
              String(workingRule),

              premises,
              conclusions
            );
            rulesList.push(aNewRule);
            break;
          }
        }
      } else {

        let aNewRule = this.makeRule(
          String(workingRule),
          premises,
          conclusions
        );

        rulesList.push(aNewRule);
        premises = [];
        let ruleType = aRulePart["type"];
        if (ruleType == "premise") {
          let statementPart = aRulePart["statements"];
          let statement = statementPart["statement"];
          // @ts-ignore
          premises.push(statement);
        }
        conclusions = [];
        workingRule = aRulePart["rule"];
      }
    }
    let kb = new KnowledgeBase(rulesList);
    console.log(kb.Print());

    return kb;
  }

  public createRule(
    name: string,
    reference: string,
    premises: Array<StatementForm>,
    conclusions: Array<StatementForm>
  ): Rule {
    return new Rule(name, reference, premises, conclusions);
  }

  // @ts-ignore
  private makeStatementFormArray(anEntryArray): Array<StatementForm> {
    let statementForms: Array<StatementForm> = [];
    // @ts-ignore
    anEntryArray.forEach((anEntry) => {
      let anObj = {
        object: anEntry[2],
        value: anEntry[3],
        cert: anEntry[4],
        tagRelation: anEntry[1],
      };
      statementForms.push(anObj);
    });
    return statementForms;
  }

  public makeRule(
    workingRule: string,
    premises: Array<StatementForm>,
    conclusions: Array<StatementForm>
  ): Rule {
    let premiseForms = this.makeStatementFormArray(premises);
    let conclusionForms = this.makeStatementFormArray(conclusions);
    return this.createRule(
      String(workingRule),
      "test",
      premiseForms,
      conclusionForms
    );
  }
  // public makePremise(aStatement: StatementForm): {};
}

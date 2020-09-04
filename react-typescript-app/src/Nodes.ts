import Outputer from "./Outputer";
import AnObject from "./AnObject";
import { Value } from "./Value";
import { QuestionType } from "./Question";
import OvPair from "./OvPair";
import Rule from "./Rule";

export default class Nodes extends Array<AnObject> {
  public static Out: Outputer = new Outputer();
  public Confidence: boolean = true;
  public Threshold: number = 0;
  public MyListOfConclusions: Array<AnObject> = [];

  // public exampleJsonString:string = `{ "theName": "weather", "aPriority" : 1,"pursue": false,"aType":3 }

  public FindObject(aName: string): AnObject | null {
    for (let i = 0; i < this.length; i++) {
      let result = this[i].Name.localeCompare(aName);
      if (result == 0) return this[i];
    }
    return null;
  }
  public Test(objName: string, objValue: string): boolean {
    let found = this.FindObject(objName);
    return found != null && found.TestValue(objValue, this.Threshold);
  }
  public fireThreshold(cert: number): boolean {
    return this.Confidence && cert > this.Threshold;
  }

  public AddObject(
    //or update
    objName: string,
    objValue: string,
    ruleName: string,
    cert: number
  ): void {
    let found: AnObject | null = this.FindObject(objName);
    if (found) {
      let aValue: Value = found.HasValue(objValue, this.Threshold);
      if (!aValue) {
        if (this.fireThreshold(cert)) {
          found.AddValueLink(new Value(objValue, ruleName, cert));
        } else {
          found.AddValueLink(new Value(objValue, ruleName, cert));
        }
      } else aValue.UpDateCert(ruleName, cert);
    } else {
      let newOne = this.MakeNode(QuestionType.Regular, objName);
      newOne.AddValueLink(new Value(objValue, ruleName, cert));
      this.push(newOne);
    }
  }
  public Reset(): void {
    this.forEach((anObject) => anObject.TurnOff());
  }

  // public MakeNode(allObjects: Array<AnObject>) {
  //   allObjects.forEach((anObject) => this.push(anObject));
  // }
  public MakeNode(aType: QuestionType, jsonString: string): AnObject {
    let testObj = JSON.parse(jsonString);

    let aNewObject = new AnObject(
      testObj["aType"],
      testObj["Name"],
      testObj["priority"],
      testObj["pursue"]
    );
    this.push(aNewObject);
    return aNewObject;
    // public exampleJsonString:string = `{ "theName": "weather", "aPriority" : 1,"pursue": false,"aType":3 }
  }
  public Conclude(
    aRule: Rule,
    conList: Array<OvPair>,
    ruleName: string,
    isElse: boolean
  ): void {
    let cert = 100;
    conList.forEach((ovPair) => {
      //   if (this.Confidence) {
      // let premiseCert = aRule.FindCert(this);
      // let cert = (premiseCert * ovPair.Cert) / 100;
      // } else cert = ovPair.Cert;

      if (isElse) cert = 100 - cert;

      this.AddObject(ovPair.TheObject, ovPair.TheValue, ruleName, cert);
      let myObject = this.FindObject(ovPair.TheObject);
      if(myObject != null)
      this.MyListOfConclusions.push(myObject);
    });
  }
  //  public GetHashTables() :
}

import OvPair from "./OvPair";
import BodyParse from "./BodyParse";

export interface StatementForm {
  object: string;
  value: string;
  cert: number;
  tagRelation: string;
}

export default class Statement {
  public tag: string;
  public aPair: OvPair;

  public constructor(aStatement: StatementForm) {
    this.tag = aStatement.tagRelation;
    this.aPair = BodyParse.Parse(aStatement);
  }
}

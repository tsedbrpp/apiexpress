
// eslint-disable-next-line max-len
type WhereFilterOp = "<" | "<=" | "==" | "!=" | ">=" | ">" | "array-contains" | "in" | "array-contains-any" | "not-in"

const whereClause = class WhereClause {
  // eslint-disable-next-line require-jsdoc
  get operator(): WhereFilterOp {
    return this._operator;
  }

  // eslint-disable-next-line require-jsdoc
  set operator(val:WhereFilterOp) {
    this._operator = val;
  }
  // eslint-disable-next-line require-jsdoc
  get value(): string | number {
    return this._value;
  }

  // eslint-disable-next-line require-jsdoc
  set value(value: string | number) {
    this._value = value;
  }


  // eslint-disable-next-line require-jsdoc
  get fieldToFilter(): string {
    return this._fieldToFilter;
  }

  // eslint-disable-next-line require-jsdoc
  set fieldToFilter(value: string) {
    this._fieldToFilter = value;
  }

    private _fieldToFilter: string = ""
    private _value: string | number = "";
    private _operator: WhereFilterOp= "<";


    // eslint-disable-next-line require-jsdoc
    constructor(field:string, operator:WhereFilterOp, value:string | number) {
      this._fieldToFilter = field;
      this._operator = operator;
      this._value = value;
    }
};
export default whereClause;

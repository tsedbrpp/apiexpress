export class Value {
  EPSILON: number = 0.001;
  public Name: string;
  public Cert: number;
  HasCertainty: boolean;
  public setBy: string;

  public constructor(aValue: string, aRule: string, aCert: number) {
    this.Name = aValue;
    this.setBy = aRule;
    this.Cert = aCert;
    this.HasCertainty = true;
  }

  public UpDateCert(ruleNo: string, myCert: number): void {
    if (myCert < this.Cert) this.Cert = myCert;
    this.setBy = ruleNo;
  }

  public Print(): void {
    console.log(" value = " + this.Name + " setBy " + this.setBy);
  }

  public PrintString(): string {
    if (this.HasCertainty)
      //&& !(HasFuzzy))
      return this.Name + " CF = " + this.Cert;
    return this.Name;
  }

  public UrlString(): string {

     let aString = this.Name.split(" ");
    const reducer = (accumulator: any, currentValue: any) => accumulator + currentValue;
    return this.Name.startsWith("URL:") ? aString.reduce(reducer) : "";
  }

  public NameString(): string {
    let aString = this.Name.split("URL:");
    return aString === undefined ? "" : aString[0];
  }

  public Equals(
    theOneInsName: string,
    math: boolean,
    threshold: number
  ): boolean {
    let theBool: boolean;

    if (math) {
      try {
        theBool = this.Compare(theOneInsName);
      } catch (Exception) {
        console.log("bad fuzzy number format");
        return false;
      }
    } else {
      theBool = this.Name === theOneInsName && this.Cert > threshold;
    }

    return theBool;
  }

  public Compare(theOneInsName: string): boolean {
    let aVec = theOneInsName.split(" ");

    try {
      let sOperator = aVec[0];

      let theValue = aVec[1];

      try {
        let nameValue = this.Cert;

        let parsedValue = Number(theValue);
        if ("<=" === sOperator) return nameValue <= parsedValue;
        if ("<" === sOperator) return nameValue < parsedValue;
        if ("!=" === sOperator)
          return Math.abs(nameValue - parsedValue) > this.EPSILON;
        if ("=" === sOperator)
          return Math.abs(nameValue - parsedValue) < this.EPSILON;
        if (">" === sOperator) return nameValue > parsedValue;
        if (">=" === sOperator) return nameValue >= parsedValue;
        if ("between" === sOperator) {
          let bigOne = aVec[2];
          let bigValue = Number(bigOne);
          return nameValue >= parsedValue && nameValue <= bigValue;
        }
        if ("not between" === sOperator) {
          let bigOne = aVec[2];
          let bigValue = Number(bigOne);
          return nameValue <= parsedValue || nameValue >= bigValue;
        }
        return false;
      } catch (e1) {
        console.log("bad format in math" + e1);
        return false;
      }
    } catch (e) {
      console.log("bad format in math" + e);
      return false;
    }
  }
}

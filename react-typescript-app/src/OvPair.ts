export default class OvPair {
  public TheObject: string;

  public TheValue: string;

  public Cert: number;

  public constructor(anObject: string, aValue: string, aCert: number) {
    this.TheObject = anObject[<any>"object"] ;
    this.TheValue = aValue[<any>"value"];
    this.Cert = aCert;
  }

  public toString(): string {
    return `object: ${this.TheObject} === ${
      this.TheValue.split("URL:")[0]
    } + CF + ${this.Cert}`;
  }
  public objectEquals(anObject: string): boolean {
    return this.TheObject == anObject;
  }

  public isNull() {
    return this.TheObject == undefined;
  }

  public Equivalent(aPair: OvPair): boolean {
    return JSON.stringify(this) === JSON.stringify(OvPair);
  }

  public Exchange(newPair: OvPair): boolean {
    {
      this.TheObject = newPair.TheObject;
      this.TheValue = newPair.TheValue;
      this.Cert = newPair.Cert;
      return true;
    }
    return false;
  }
}

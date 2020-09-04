import OvPair from "./OvPair";
import Nodes from "./Nodes";

export default class LogicSet {
  public PairList: Array<OvPair>;
  public Tag: string;
  public Certainty: number = 0;
  public Seal: boolean;

  constructor(tag: string) {
    this.PairList = [];
    this.Tag = tag;
    this.Seal = false;
  }

  public Add(aPair: OvPair): void {
    this.PairList.push(aPair);
  }
  public isEmpty(): boolean {
    return this.PairList.length === 0;
  }

  public SearchAndReplace(current: OvPair, newPair: OvPair): boolean {
    let result = this.PairList.filter((aOv) => aOv.Equivalent(current));
    if (result.length != 1) {
      result[0].Exchange(newPair);
      return true;
    } else {
      return false;
    }
  }

  public toString(): string {
    let first = this.Tag != "N";
    var accum = ""; //"start");
    const reducer = (accumulator: string, initial: string) => accumulator + initial;
    let result = this.PairList.map((value) => value + ", ").reduce(reducer, "");
    return result;
  }

  public Equals(aChar: string): boolean {
    return this.Tag == aChar;
  }

  public FindCert(theNodes: Nodes): number {
    let compareCert = NaN;
    if (this.Tag == "O") compareCert = 0;

    this.PairList.forEach((ovPair) => {
      let aLineCert = ovPair.Cert;
      let anObject = theNodes.FindObject(ovPair.TheObject);
     if(anObject) {
       let theValue = anObject.HasValue(ovPair.TheValue, theNodes.Threshold);

       if (theValue) {
         let cert = (theValue.Cert * aLineCert) / 100;
         this.Tag == "A" && cert < compareCert
             ? (compareCert = cert)
             : this.Tag == "O" && cert > compareCert
             ? (compareCert = cert)
             : this.Tag == "N" && 100 - cert < compareCert
                 ? (compareCert = 100 - cert)
                 : (cert = NaN);

         if (isNaN(compareCert))
           throw new Error(
               `bad tag in Logic Set" ${this.Tag} cert ${cert} compare ${compareCert}`
           );
         return compareCert;
       }
       return -1;
     }
    });
    return -1;
  }
}

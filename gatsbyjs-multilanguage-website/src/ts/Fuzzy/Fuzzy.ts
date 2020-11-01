import Triangle from "./Triangle"
import Membership from "./Membership"
interface DictionaryInfo {
  hedge: string
  strength:number
}

export default class Fuzzy {


  private Epsilon: number = .001;
  public TheDic: Array<DictionaryInfo> | undefined = undefined
  //public RevDic: Record<string,number> | undefined= undefined;
  private _hedgeDic: Array<DictionaryInfo> | undefined = undefined;
  private _numList: Array<number> | undefined;
  private _triangleList: Array<Triangle> | undefined

  get HedgeDic(): Array<DictionaryInfo> | undefined {
    return this._hedgeDic;
  }

  set HedgeDic(value: Array<DictionaryInfo> | undefined) {
    this._hedgeDic = value
  }


  private _theTable: Array<string> | undefined

  get TheTable(): Array<string> | undefined {
    return this._theTable;
  }

  set TheTable(value: Array<string> | undefined) {
    this._theTable = value
  }


  private initHedges = ((hedges: Array<string>, count: number, increment: number) => {
    hedges.forEach(info => {
      if ((count - increment) < 0) count = 0;
      const aRecord: DictionaryInfo = { hedge: (info.trim()), strength: count }
      this._hedgeDic && this._hedgeDic.push(aRecord)
      count = count - increment;
    })

  })

  private initTriangles = () => {
    let theMiddle: number = 100;
    if (this._theTable) {
      let increment = 100.0 / ((this._theTable.length - 1));
      let _triangleList: Array<Triangle> = []
      let i: number = 0;
      while (i < this._theTable.length) {
        let TableString = this._theTable[i++];
        let tri = new Triangle(theMiddle - increment, theMiddle, theMiddle + increment, TableString);
        _triangleList.push(tri);
        theMiddle -= increment;
      }


    }


  }


  private initTable = ((table: Array<string>, count: number, increment: number) => {

    table.forEach(value => {
      this._theTable && this._theTable.push(value);
      let num: number;
      if (Math.abs((count - 100)) < this.Epsilon) {
        num = ((count - (2 * increment)) + (count - increment)) / 2;

      } else if ((count - (3 * increment)) < 0) {
        num = 0;
      } else {
        num = (count - (3 * increment) + count - (2 * increment)) / 2;
        count = count - increment;
      }

      const aRecord: DictionaryInfo = { hedge: value.trim(), strength: num }
      //   System.out.println( "show " + aValue + " " + (num));
      this.TheDic && this.TheDic.push(aRecord);

      this._numList && this._numList.push(num);
      count = count - increment;

    })
  })

  constructor(table: Array<string>, hedges: Array<string>) {
    this._triangleList = [];
    this._theTable = [];
    this._numList = [];
    let increment = 100 / (this._theTable.length * 2 - 1);

    let count = 100;
    table && table.length > 0 && this.initTable(table, count, increment);
    hedges && hedges.length > 0 && this.initHedges(hedges, count, 100)
    table && this.initTriangles();
  }

  public getHedgeMembership(hedgeString: string, cert: number, confidence: boolean = false): number | undefined {
    let i: number = 0;
    if (this.HedgeDic) {
      for (i = 0; i < this.HedgeDic.length; i++) {
        let dirInfo: DictionaryInfo = this.HedgeDic[i];
        if (dirInfo.hedge === hedgeString) {
          let right: number = dirInfo.strength;
          if (confidence) return ((right * cert) / 100.0);
          else {
            let left: number = this._numList && i < this._numList?.length ? this._numList[i] : 0;
            return Membership.calcMembership(left, right, right, cert);
          }
        }
      }
    } else return 0;
  }

  public findText(value: number): string {
    let lastValue = "";
    let i: number = 0;
    if (this._triangleList) {
      for (i = 0; i < this._triangleList.length; i++) {
        var num = 100 * Membership.calcTriangularMembership(this._triangleList[i].left, this._triangleList[i].middle,
          this._triangleList[i].right, value);
        if (num > 0) {
             let text = this.HedgeText(num);
             if(text === "") continue;
          lastValue = lastValue + " " + text + " " + this._triangleList[i].term
        }
      }
    }
    return lastValue;
  }

  public findNum(num:number): Array<DictionaryInfo> {
    let memberships:Array<DictionaryInfo> = [];
    let i: number = 0;
    if (this._triangleList) {

      for (i = 0; i < this._triangleList.length; i++) {
        let aMembership = 100 * Membership.calcTriangularMembership(this._triangleList[i].left, this._triangleList[i].middle,
          this._triangleList[i].right, num);
        let aTerm = this._triangleList[i].term;
        if (aMembership > 0)
          memberships.push({ hedge: aTerm, strength: aMembership});
      }

    }
      return memberships
  }

private HedgeText(num:number):string {
  if (this._hedgeDic) {
    let key = this.closest(this._hedgeDic, num);
    let i: number = 0;
    if (this.HedgeDic) {
      for (i = 0; i < this._hedgeDic.length; i++) {
        if (this.HedgeDic[i].strength === key)
          return this.HedgeDic[i].hedge;
      }
    }
  }
  return "not found";
}



 private closest = ( (arr:Array<DictionaryInfo>, num:number)  => {
    return arr.reduce((acc, val) => {
      if(Math.abs(val.strength - num) < Math.abs(acc)){
        return val.strength - num;
      }else{
        return acc;
      }
    }, Infinity) + num;
})

}










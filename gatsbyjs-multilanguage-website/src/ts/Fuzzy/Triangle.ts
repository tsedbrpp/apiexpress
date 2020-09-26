


export default class Triangle
{
  private _left:number  = 0;
  private _middle:number  = 0;
  private _right:number  = 0;
  private _term:string  = "";

  get left():number {
    return this._left;
  }
  set left(value:number){
    this._left = value
  }

  get middle():number {
    return this._middle;
  }
  set middle(value:number){
    this._middle = value
  }

  get right():number {
    return this._right;
  }
  set right(value:number){
    this._right = value
  }


  get term():string {
    return this._term;
  }
  set term(value:string){
    this._term = value
  }

constructor(left:number,middle:number, right:number, term:string)
{
  this._left = left;
  this._middle = middle;
  this._right = right;
  this._term = term;
}




}

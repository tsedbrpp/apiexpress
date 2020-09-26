

export default class Membership {
   private Epsilon:number = .001
  public static calcMembership(  a1:number, a2:number, a3:number, x:number): number{
  let Epsilon:number = .001
    if (Math.abs(a1 - a2) < Epsilon)
    {
      if (x <= a1)
        return 100;
      if ((x >= a2) && (x <= a3))
        return (Math.round(((a3 - x) / (a3 - a2)) * 100));
      return 0;
    }
    if (Math.abs(a2 - a3) < Epsilon)
    {
      if (x >= a3)
        return 100;
      if ((x >= a1) && (x <= a2))
        return (Math.round(((x - a1) / (a2 - a1)) * 100));
      return 0;
    }

    if (x <= a1)
      return 0;
    if ((x >= a1) && (x <= a2))
      return (Math.round(((x - a1) / (a2 - a1)) * 100));
    if ((x >= a2) && (x <= a3))
      return (Math.round(((a3 - x) / (a3 - a2)) * 100));
    return 0;

  }
  public static calcTrapMembership(  a1:number, a2:number, a3:number,a4:number, x:number): number {

    if (x <= a1)
      return 0;
    if ((x > a1) && (x <= a2))
      return (Math.round(((x - a1) / (a2 - a1)) * 100));
    if ((x > a2) && (x <= a3))
      return (100);

    if ((x > a3) && (x <= a4))
      return (Math.round(((a4 - x) / (a4 - a3)) * 100));
    return 0;

  }

  public static calcTriangularMembership(  a:number, b:number, c:number, x:number): number{
    var first = (x - a) / (b - a);
    var second = (c - x) / (c - b);
    var aMin = Math.min(first, second);
    var result = Math.max(aMin, 0);
    return result;

  }



}

export default // @ts-ignore
class Outputer {
  public static Result: string;

  public static Update(aString: string): void {
    Outputer.Result += aString;
  }

  public static Reset(): void {
    Outputer.Result = "";
  }
}

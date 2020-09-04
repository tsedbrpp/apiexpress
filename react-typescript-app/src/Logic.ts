import Statement from "./Statement";

export default class Logic {
  public static SealIt: boolean;
  public static CreateNewLogic: boolean;
  public static ContainsPrior: boolean;
  private static _priorStatement: Statement;

  public static GetPriorStatement(current: Statement) {
    if (!Logic.ContainsPrior) {
    } else {
      switch (current.tag[<any>"logic"]) {
        case "O":
          if (this._priorStatement.tag[<any>"logic"] == "N")
            return this._priorStatement;
          if (this._priorStatement.tag[<any>"logic"] == "A") {
            // @ts-ignore
            this._priorStatement.tag["logic"] = "O";
            Logic.CreateNewLogic = true;
            return this._priorStatement;
          }
          return this._priorStatement;

        case "A":
          if (this._priorStatement.tag[<any>"logic"] == "O") {
            Logic.SealIt = true;
            return this._priorStatement;
          }
          return this._priorStatement;
        case "N":
          return this._priorStatement;

        default:
          return null;
      }
    }
    return null;
  }

  public static getPrior(): Statement {
    return Logic._priorStatement;
  }

  public static setPrior(aStatement: Statement): void {
    Logic._priorStatement = aStatement;
    Logic.ContainsPrior = true;
  }
}

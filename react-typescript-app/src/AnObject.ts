import Outputer from "./Outputer";
import { Question, QuestionType } from "./Question";
import { Value } from "./Value";
import ModelUpper from "./ModelUpper";
import KnowledgeBase from "./KnowledgeBase";

export default class AnObject {
  static EPSILON: Number = 0.001;

  public Out = new Outputer();
  public Name: string;
  private _question: Question;
  public myMath: boolean;

  get TheQuestion() {
    return this._question;
  }

  set TheQuestion($v) {
    this._question = $v;
    this.myMath = this._question.Math;
  }

  public Goal: boolean;

  public PursueAll: boolean;
  public Priority: number;
  public Sought: boolean;
  public ValueList: Array<Value>;

  constructor(
    aType: QuestionType,
    theName: string,
    qText: string,
    eText: string,
    legals: Array<string> = [],
    aPriority: number = 1,
    pursue: boolean = false
  ) {
    this.Name = theName;
    this.Priority = aPriority;
    this.ValueList = [];
    this._question = new Question(aType, theName, qText, eText, legals);
    this.Goal = pursue; ///test if goal is needed
    this.myMath = false;
    this.PursueAll = pursue;
    this.Sought = false;
  }

  public SetQuestion(aQuestion: Question): void {
    this.TheQuestion = aQuestion;
    this.myMath = this.TheQuestion.Math;
  }

  public IsKnown(): boolean {
    return this.ValueList.length > 0;
  }

  public FlipSought(): void {
    this.Sought = true;
  }

  public TurnOff(): void {
    this.Sought = false;
    this.ValueList = [];
  }

  public TestValue(aValue: string, threshold: number): boolean {
    let theTransformed = aValue; //Fuzzy ? TrimHedges(aValue) : aValue;

    if (
      this.ValueList.some((value) =>
        value.Equals(theTransformed, this.myMath, threshold)
      )
    ) {
      return !this.Name.startsWith("NOT");
    }

    return this.Name.startsWith("NOT");
  }

  public HasValue(aValue: string, threshold: number): Value {
    this.ValueList.filter((value) => {
      value.Equals(aValue, this.myMath, threshold);
      return value;
    });
    // @ts-ignore
    return null;
  }

  // @ts-ignore
  public UpdateUserAnswer(myMap: Record<string, [string]>, theDict) {
    let theStrings = [...theDict["first"]];

    let cf = 100;
    let theCfs = [...theDict["cf"]];

    if (theCfs.length === 0) cf = theCfs[0];

    theStrings.forEach((aString) => {
      let aValue = new Value(aString, "user", cf);
      this.ValueList.push(aValue);
    });
  }

  AddValueLink(value: Value) {
    this.ValueList.push(value);
  }
  public ValueHash(): Map<string, number> {
    let myMap = new Map();
    this.ValueList.map((value) => myMap.set(value.Name, value.Cert));
    return myMap;
  }

  public async Ask(): Promise<boolean> {
    let result = await ModelUpper.GetInstance().Ask(this);
    let aValue = new Value(result, "asked", 100);
    this.AddValueLink(aValue);

    return true;
  }

  public LegalHash(): Array<String> {
    return this.TheQuestion.LegalList;
  }
  public HasSetting(aValue: string): boolean {
    return this.TheQuestion.LegalList.some((value) => value == aValue);
  }

  public Invert(theCert: number, sub: number, increment: number): number {
    return sub - (theCert * increment) / 100;
  }

  public PrintValues(): void {
    let result = this.ValueList.filter((aValue) => aValue);
    result.forEach((aValue) => aValue.Print());
  }

  public ResetSought(): void {
    this.Sought = false;
  }

  public PrintStringUser(): string {
    Outputer.Reset();
    this.ValueList.forEach((aValue) => {
      if (aValue.setBy == "user") {
        Outputer.Update("!!set by user ----");
        Outputer.Update(this.Name + " == ");
        Outputer.Update(aValue.PrintString());
        Outputer.Update("\n");
      }
    });
    return Outputer.Result;
  }
  public PrintStringRules(kb: KnowledgeBase): string {
    Outputer.Reset();
    this.ValueList.forEach((aValue) => {
      let indicator = aValue.setBy;
      if (!(indicator == "user")) {
        Outputer.Update("\n" + this.Name + " == ");

        Outputer.Update(aValue.PrintString());
        Outputer.Update(kb.PrintRule(indicator));
      }
    });
    return Outputer.Result;
  }
}
/*


class Value {
  EPSILON: number = 0.001;
  public Name: string;
  public Cert: number;

  public constructor(aValue: string, aCert: number) {
    this.Name = aValue;

    this.Cert = aCert;

  }
 }

 let ValueList = [new Value("one", 1),new Value("two", 2) ]


  function ValueHash(): Map<string, number> {
   let  myMap = new Map<string,number>();
  ValueList.forEach(value =>  myMap.set(value.Name, value.Cert));
  Array.from(myMap, ([key, value]) => console.log(key, value))


  return myMap;
  }

ValueHash();
    public async Task<string>

    Ask() {
        string
        answerFinished;


        ModelUpper.Instance.MyAskAnswer.Ask(this);


        try {
            answerFinished = await ModelUpper.Instance.MyAskAnswer.Answer(this);
        } catch (Exception
        e
    )
        {
            throw new Exception(e.Message);
        }

        return (answerFinished);
    }



    public override
    String

    ToString() {
        return (Name + " " + Priority + " " + PursueAll);
    }


    public void

    PrintValues() {

        foreach(Value
        value in ValueList.Where(value => value != null)
    )
        {
            value.Print();
        }
    }

    public void

    ResetSought() {
        Sought = false;
    }


    public virtual
    String

    PrintStringUser(KnowledgeBase

    kb
) {
    Out
.

    Reset();

    //  bool Fuzzy = false;
    foreach(Value

    aValue
    in
    ValueList
) {
    String
    setby = aValue.Setby;

    if(setby

.

    Equals(

    "user"
)) {
    Out
.

    Update(

    "!!set by user ----"
);
    Out
.

    Update(Name

+
    " == "
);


    Out
.

    Update(aValue

.

    PrintString()

);
    Out
.

    Update(

    "\n"
);

}

}
return (Out.Result);
}



public
virtual
String
PrintStringRules(KnowledgeBase
kb
)
{
    Out.Reset();
    foreach(Value
    aValue in ValueList
)
    {
        String
        indicator;
        if (!(indicator = aValue.Setby).Equals("user")) {
            Out.Update("\n" + Name + " == ");

            Out.Update(aValue.PrintString());
            Out.Update("  --- concluded by \n");
            Out.Update(kb.PrintRule(indicator));

        }
    }
    return (Out.Result);

}


public
bool
HasSetting(String
aValue
)
{
    return TheQuestion.LegalList.Any(aValue.Equals);
}

public
int
GetSetting() //?????????????????????????
{
    // this appears to expect an int
    foreach(
    var aValue
in
    TheQuestion.LegalList
)
    {
        int
        num1;
        bool
        res = int.TryParse(aValue, out
        num1
    )

        if (res == false) {
            return 0;
        }
        return num1;
    }
    return 0;
}
*/

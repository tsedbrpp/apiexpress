export enum QuestionType {
  MultiValuedMath,
  MultiValued,
  Math,
  Regular,
  FuzzyLegals,
  FuzzyHedges,
  Fuzzy,
}

export class Question {
  public TextOfQuestion: string;
  public MultiValued: boolean;
  public Math: boolean;
  public Explanation: string;
  public LegalList: string[];

  constructor(
    qType: QuestionType,
    objectName: string,
    qText: string,
    eText: string,
    legal: string[]
  ) {
    if (qText == null) this.TextOfQuestion = " what is";
    else this.TextOfQuestion = qText;

    this.Math = false;
    this.MultiValued = false;
    switch (qType) {
      case QuestionType.Math:
        this.Math = true;
        break;
      case QuestionType.MultiValued:
        this.MultiValued = true;
        break;
      case QuestionType.MultiValuedMath:
        this.Math = true;
        this.MultiValued = true;
        break;
      default:
        break;
    }

    this.Explanation = eText ?? "no help available";
    if (legal != null) {
      this.LegalList = [...legal];
      //LegalList = new List<string>();
      //foreach(String aString in legal)
      //      LegalList.Add(aString);
    } else {
      this.LegalList = ["true", "false"];
    }
  }
}

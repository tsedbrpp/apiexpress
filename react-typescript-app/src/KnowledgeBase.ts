import Rule from "./Rule";

export default class KnowledgeBase {
  // @ts-ignore
  public rules: Array<Rule> = null;

  constructor(rules: Array<Rule>) {
    this.rules = rules;
  }
  public FindRules(aName: string): Array<Rule> {
    let filtered = this.rules.filter((aRule) => aRule.Concludes(aName));
    return filtered;
  }

  public GetRule(ruleName: string): Rule {
    return this.FindRules(ruleName)[0];
  }

  public FindRuleByName(ruleName: string): Rule {
    const found = this.rules.find((element) => element.myName == ruleName);
    return <Rule>found;
  }
  public Print(): string {
    {
      let accum = "";
      this.rules.forEach((aRule) => {
        accum += aRule.Print();
      });
      return accum;
    }
  }

  public PrintRule(ruleName: string): string {
    let aRule = this.FindRuleByName(ruleName);
    return aRule.Print();
  }
}

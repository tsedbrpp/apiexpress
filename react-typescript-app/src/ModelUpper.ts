import InferenceEngine from "./InferenceEngine";
import KnowledgeBase from "./KnowledgeBase";
import CreateJSON from "./CreateJSON";
import AskAnswer from "./AskAnswer";
import AnObject from "./AnObject";




export default class ModelUpper {
  public static RuleJsonLocation: string;
  public static ObjectJsonLocation: string;
  private static _instance: ModelUpper;
  public static GetInstance(): ModelUpper {
    return ModelUpper._instance
      ? ModelUpper._instance
      : (ModelUpper._instance = new ModelUpper(
          ModelUpper.RuleJsonLocation,
          ModelUpper.ObjectJsonLocation
        ));
  }
  private _engine: InferenceEngine = new InferenceEngine();
//  private _kb: KnowledgeBase = null;
 // private _nodes = null;
  // @ts-ignore
  private _myAsk: AskAnswer = null;
  private constructor(RuleJsonLocation: string, objectJsonLocation: string) {
    this._engine.Nodes = new CreateJSON().createTheObjects("foo.json");
    this._engine.Nodes.Confidence = true;
    this._engine.Kb = new CreateJSON().createTheRules("pem.json");
    this._myAsk = new AskAnswer();
  }

  public async Ask(anObject: AnObject): Promise<string> {
    return await ModelUpper._instance._myAsk.Ask(anObject);
  }

  public async pursue(): Promise<boolean> {
    this._engine.Reset();
    let result = "";
    if (await this._engine.BackwardChain("socrates")) {
      /* let conclusions = this._engine.Nodes.MyListOfConclusions;
      conclusions.forEach((anObject) => (result += anObject.Name));

      console.log(result);*/
      let conclusions = this._engine.Nodes.MyListOfConclusions;
      conclusions.forEach((obj) => {
        // @ts-ignore
        result += obj.PrintStringRules(this._engine.Kb);
      });
      console.log(result);
      return true;
    }
    return false;
  }
}

async function example_async() {
  // Available only with `prompt-async`!
  // Start the prompt.
  // start();
  let modelUpper = ModelUpper.GetInstance();
  await modelUpper.pursue();
}

async function error_handling_async() {
  try {
    await example_async();
  } catch (error) {
    console.error("An error occurred: ", error);
  }
}

//error_handling_async();

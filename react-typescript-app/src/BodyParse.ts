import OvPair from "./OvPair";
import { StatementForm } from "./Statement";

export default class BodyParse {
  public static Parse(config: StatementForm): OvPair {
    if (config.cert)
      return new OvPair(config.object, config.value, config.cert);
    else return new OvPair(config.object, config.value, 100);
  }
}

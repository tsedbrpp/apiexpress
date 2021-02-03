// eslint-disable-next-line no-unused-vars
import {firestore} from "firebase-admin/lib/firestore";
// eslint-disable-next-line no-unused-vars
import {DocumentSnapshot} from "firebase-functions/lib/providers/firestore";
// eslint-disable-next-line no-unused-vars
import IConverter from "../Model/IConverter";
import KnowledgeBase from "../Model/KnowledgeBase";


// eslint-disable-next-line require-jsdoc
class RuleObjectConverters implements IConverter {
  // eslint-disable-next-line require-jsdoc

  // eslint-disable-next-line require-jsdoc
  public toFirestore(kb:any): firestore.DocumentData {
    const test = {ruleObjects: kb.ruleObjects};
    return test;
  }


  // eslint-disable-next-line max-len,require-jsdoc
  public fromFirestore(snapshot: DocumentSnapshot, options: firebase.firestore.SnapshotOptions): KnowledgeBase | null {
    // console.log("snapshot " + snapshot.id)
    const data = snapshot.data();
    if (data) {
      // eslint-disable-next-line max-len
      const kb = new KnowledgeBase( data.uid, data.userName, data.title, data.description, data.spreadSheetURL, data.ruleObjects);
      kb.id = snapshot.id;
      return kb;
    }
    console.log("no data");
    return null;
  }
}
export default RuleObjectConverters;


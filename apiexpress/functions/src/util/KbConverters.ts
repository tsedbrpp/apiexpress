
// eslint-disable-next-line no-unused-vars
import {firestore} from "firebase-admin/lib/firestore";
// eslint-disable-next-line no-unused-vars
import {DocumentSnapshot} from "firebase-functions/lib/providers/firestore";
// eslint-disable-next-line no-unused-vars
import IConverter from "../Model/IConverter";
import KnowledgeBase from "../Model/KnowledgeBase";


// eslint-disable-next-line require-jsdoc
class KbConverters implements IConverter {
  // eslint-disable-next-line require-jsdoc
  public toFirestore(kb:any): firestore.DocumentData {
    return {
      uid: kb.uid,
      userName: kb.userName,
      title: kb.title,
      description: kb.description,
      spreadSheetURL: kb.spreadSheetURL,
      ruleObjects: kb.ruleObjects,
      privateKb: kb.privateKb,
    };
  }
  // eslint-disable-next-line max-len,require-jsdoc
  public fromFirestore(snapshot: DocumentSnapshot, options: firebase.firestore.SnapshotOptions): KnowledgeBase | null {
  // console.log("snapshot " + snapshot.id)
    const data = snapshot.data();
    if (data) {
      // eslint-disable-next-line max-len
      const kb = new KnowledgeBase( data.uid, data.userName, data.title, data.description, data.spreadSheetURL, data.ruleObjects, data.privateKb);
      kb.id = snapshot.id;
      return kb;
    }
    console.log("no data");
    return null;
  }
}
export default KbConverters;

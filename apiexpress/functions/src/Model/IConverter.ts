// eslint-disable-next-line no-unused-vars
import {firestore} from "firebase-admin/lib/firestore";
// eslint-disable-next-line import/no-extraneous-dependencies,no-unused-vars
import * as firebase from "firebase";
// eslint-disable-next-line no-unused-vars
import {DocumentSnapshot} from "firebase-functions/lib/providers/firestore";
// eslint-disable-next-line no-unused-vars
import IStoreable from "./IStoreable";

export default interface IConverter {
   toFirestore(aclass:IStoreable) : firestore.DocumentData;
    // eslint-disable-next-line max-len
    fromFirestore(snapshot: DocumentSnapshot, options: firebase.firestore.SnapshotOptions): IStoreable| null;
};

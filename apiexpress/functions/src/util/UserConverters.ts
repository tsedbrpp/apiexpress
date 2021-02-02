
// eslint-disable-next-line no-unused-vars
import {firestore} from "firebase-admin/lib/firestore";
// eslint-disable-next-line no-unused-vars
import {DocumentSnapshot} from "firebase-functions/lib/providers/firestore";
// eslint-disable-next-line no-unused-vars
import IConverter from "../Model/IConverter";
import ClientUser from "../Model/ClientUser";

// eslint-disable-next-line require-jsdoc
class UserConverters implements IConverter {
  // eslint-disable-next-line require-jsdoc
  public toFirestore(obj: ClientUser): firestore.DocumentData {
    return {
      uid: obj.userId,
      userName: obj.userName,
      photoUrl: obj.photoUrl,
      email: obj.email,
      runLimit: obj.runLimit,
      numberOfSystems: obj.numberOfSystems
    };
  }

  // eslint-disable-next-line max-len,require-jsdoc
  public fromFirestore(snapshot:DocumentSnapshot, options:firebase.firestore.SnapshotOptions): ClientUser | null {
    const data = snapshot.data() ;

    if (data) {
      // eslint-disable-next-line max-len
      const user = new ClientUser(data.uid, data.userName, data.photoUrl, data.email,data.runLimit,data.numberOfSystems);
       console.log( snapshot.id + " snapshot from userconverter")
     user.id = snapshot.id;
     console.log(" user is " + user.id)
     return user;
    }
    console.log("no data");
    return null;
  }
}

export default UserConverters;

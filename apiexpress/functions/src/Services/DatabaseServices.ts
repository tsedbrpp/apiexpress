
// @ts-ignore
import {db} from "../util/admin";
// eslint-disable-next-line no-unused-vars
import IStoreable from "../Model/IStoreable";
// eslint-disable-next-line no-unused-vars
import IConverter from "../Model/IConverter";
// eslint-disable-next-line no-unused-vars
// @ts-ignore
// eslint-disable-next-line no-unused-vars
import WhereClause from "../util/WhereClause";
import {firestore} from "firebase-admin/lib/firestore";
// eslint-disable-next-line no-unused-vars
import WriteResult = firestore.WriteResult;


const databaseServices = class DatabaseServices {
  // eslint-disable-next-line max-len,require-jsdoc


  // eslint-disable-next-line max-len,require-jsdoc
  public static async editCollection(collection:string, id:string, body:object): Promise<WriteResult> {
    // console.log( " edit id " + id);
    try {
      const document = await db.collection(collection).doc(`${id}`);
      const result:WriteResult = await document.update(body);
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  }


  // eslint-disable-next-line max-len,require-jsdoc
  public static async incrementField(collection: string, id: string | undefined, field:string, count:number) {
    try {
      if (!id) return "error no id";
      const documentRef = await db.collection(collection).doc(id);
      const increment = await firestore.FieldValue.increment(count);

      const obj = {[field]: increment};

      documentRef.update(obj);
      return "updated";
    } catch (error) {
      console.log(error);
      return error;
    }
  }


  // eslint-disable-next-line max-len,require-jsdoc
  public static async addToCollection(collection: string, value: IStoreable, converter:IConverter): Promise<string> {
    if (converter) {
      const newDoc = converter.toFirestore(value);

      try {
        const postSnap = await db.collection(collection).add(newDoc);
        return postSnap.id;
      } catch (error) {
        console.log(error);
        return error;
      }
    }
    return "";
  }

  // eslint-disable-next-line max-len,require-jsdoc
  public static async deleteIdFromCollection(collection: string, id: string | undefined): Promise<string> {
    const documentRef = await db.collection(collection).doc(id);
    try {
      if (documentRef) {
        await documentRef.delete();
        return "deleted";
      } else return "something went wrong";
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  // eslint-disable-next-line max-len,require-jsdoc
  public static async getAllFromCollection(collection: string, converter:IConverter): Promise<Array<IStoreable | null>> {
    if (converter) {
      try {
        const postSnap = await db.collection(collection).get();
        // eslint-disable-next-line no-array-constructor
        const results = Array<IStoreable | null>();

        if (!postSnap.empty) {
          postSnap.forEach((doc:any) => {
            if (converter) {
              results.push(converter.fromFirestore(doc, {}));
            }
          });
          return results;
        }
      } catch
      (error) {
        console.log(error);
        return error;
      }
    }
    return [];
  }

  // eslint-disable-next-line max-len,require-jsdoc
  public static async getById(collection: string, id: string, converter:IConverter): Promise<IStoreable | null> {
    if (converter) {
      try {
        const postSnap = await db.doc(`/${collection}/${id}`).get();
        if (!postSnap.exists) return null;
        return converter.fromFirestore(postSnap, {});
      } catch (error) {
        console.log(error);
        return error;
      }
    }
    console.log("dataservice returning null");
    return null;
  }


  // eslint-disable-next-line max-len,require-jsdoc

  // @ts-ignore
  // eslint-disable-next-line max-len,require-jsdoc
  public static async getByWhere(collection:string, where:WhereClause, converter:IConverter): Promise<Array<IStoreable | null>> {
    // eslint-disable-next-line no-array-constructor
    const results = Array<IStoreable | null>();
    if (converter) {
      try {
        // eslint-disable-next-line max-len
        const postSnap = await db.collection(collection).where(where.fieldToFilter, where.operator, where.value).get();

        //  console.log("postsnap");
        //  console.log(postSnap);
        if (!postSnap.empty) {
          postSnap.forEach((doc:any) => {
            //   console.log(doc);
            if (converter) {
              results.push(converter.fromFirestore(doc, {}));
            }
          });
        } else {
          return [];
        }
        return results;
      } catch (error) {
        console.log("getbywhere " + error);
        return error;
      }
    }
    return [];
  }
};
export default databaseServices;


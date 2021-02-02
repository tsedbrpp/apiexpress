
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


const databaseServices = class DatabaseServices {
  // eslint-disable-next-line max-len,require-jsdoc
  public static async editCollection(collection: string, id: string | undefined, value: IStoreable, converter: IConverter): Promise<string> {
    console.log( " edit id " + id);
    const document = await db.collection(collection).doc(id);

    if (converter) {
      const newDoc = converter.toFirestore(value);

      try {
        console.log("newdoc");
        //   console.log(newDoc);
        await document.update(newDoc);
        return "Updated successfully";
      } catch (error) {
        console.log(" edit error " + error);
        return error;
      }
    }
    return "";
  }

  // eslint-disable-next-line max-len,require-jsdoc
  public static async incrementField(collection: string, id: string | undefined, field:string, count:number) {
    try {
      if (!id) return "error no id";
      const documentRef = await db.collection(collection).doc(id);
      const increment = await firestore.FieldValue.increment(1);
      console.log("before update");
      const obj = {[field]: increment};
      console.log(obj);
      documentRef.update(obj);
      const result = await documentRef.get();
      console.log("after incrementincrement");
      console.log(result);
      return result.data[field];
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
  public static async getAllFromCollection(collection: string, converter:IConverter): Promise<Array<IStoreable | null>> {
    if (converter) {
      try {
        const postSnap = await db.collection(collection).get();
        // eslint-disable-next-line no-array-constructor
        const results = Array<IStoreable | null>();

        if (!postSnap.empty) {
          postSnap.forEach((doc:any) => {
            if (converter) {
              console.log("from getall" + doc.id );
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
  // eslint-disable-next-line max-len
  public static async getByWhere(collection:string, where:WhereClause, converter:IConverter): Promise<Array<IStoreable | null>> {
    // eslint-disable-next-line no-array-constructor
    const results = Array<IStoreable | null>();
    if (converter) {
      try {
        // eslint-disable-next-line max-len
        const postSnap = await db.collection(collection).where(where.fieldToFilter, where.operator, where.value).get();


        if (!postSnap.empty) {
          postSnap.forEach((doc:any) => {
            if (converter) {
              results.push(converter.fromFirestore(doc, {}));
            }
          });
          return results;
        }
      } catch (error) {
        console.log("getbywhere " + error);
        return error;
      }
    }
    return [];
  }
};
export default databaseServices;


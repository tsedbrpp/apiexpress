import ClientUser from "../Model/ClientUser";
// @ts-ignore
// eslint-disable-next-line no-unused-vars
import {auth} from "firebase-functions";
import DatabaseServices from "./DatabaseServices";
import UserConverters from "../util/UserConverters";

// eslint-disable-next-line require-jsdoc
export default async function processSign(user:auth.UserRecord) {
  // eslint-disable-next-line max-len
  const clientUser = new ClientUser(user.uid, user.displayName, user.photoURL, user.email, 0, 0);
  // eslint-disable-next-line max-len
  const result = await DatabaseServices.addToCollection("user", clientUser, new UserConverters());
  return result;
}

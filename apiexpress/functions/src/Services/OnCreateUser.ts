import ClientUser from "../Model/ClientUser";
// @ts-ignore
import {auth} from "firebase-functions";
import DatabaseServices from "./DatabaseServices";
import UserConverters from "../util/UserConverters";

export default async function processSign(user:auth.UserRecord) {
  const clientUser = new ClientUser(user.uid, user.displayName, user.photoURL, user.email,300,0);
  const result =   await DatabaseServices.addToCollection("user",clientUser, new UserConverters())
  return result
}

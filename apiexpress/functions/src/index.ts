

import * as functions from "firebase-functions";

// eslint-disable-next-line import/no-extraneous-dependencies
import * as express from "express";

// const morgan = require("morgan");
// @ts-ignore
const {userValidationRules, validate} = require("./middleware/validate");

const auth = require("./middleware/middleAuth");

// eslint-disable-next-line import/namespace

// const auth = require('./util/auth');
// eslint-disable-next-line new-cap
const app = express();


const {
  postSendMail,
  getLoggedInUser,
  loginUser,
} = require("./APIs/user");

const {
  getKBsbyUser,
  publish,
  publicUrl,
  deleteKb,
  getByWhere,
  getById,
  makeKB,
  updateRulebase,
  editKb,
} = require("./APIs/kb");


const cors = require("cors")({origin: true});
app.use(cors);
// app.use(morgan("tiny"));
// Todos
app.get("/publish/:id", auth, publish);
app.get("/published/:id", publicUrl);
app.get("/mine", auth, getKBsbyUser);
app.get("/kbs", getByWhere);
app.get("/find/:id", getById);
app.delete("/delete/:id", auth, deleteKb);

app.post("/create", auth, makeKB);


app.get("/user", auth, getLoggedInUser);
app.post("/loginpage", loginUser);
app.post("/postSendMail", postSendMail);
app.put("/updateRules/:id", auth, updateRulebase);
app.put("/editKb/:id", auth, userValidationRules(), validate, editKb);

exports.api = functions.https.onRequest(app);
import onCreateUser from "./Services/OnCreateUser";

exports.ProccessSignUp = functions.auth.user().onCreate(async (user) => {
  const result = await onCreateUser(user);
  return result;
});



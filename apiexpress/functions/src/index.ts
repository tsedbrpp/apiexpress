

import * as functions from "firebase-functions";

// eslint-disable-next-line import/no-extraneous-dependencies
import * as express from "express";

const morgan = require("morgan");


const auth = require("./middleware/middleAuth");

// eslint-disable-next-line import/namespace

// const auth = require('./util/auth');
// eslint-disable-next-line new-cap
const app = express();


const {
  getUsers,
  getUserById,
  loginUser,
} = require("./APIs/user");

const {
  getKBs,
  getByWhere,
  getById,
  makeKB,
  updateKb,
} = require("./APIs/kb");


const cors = require("cors")({origin: true});
app.use(cors);
app.use(morgan("tiny"));
// Todos


app.get("/kb", auth, getKBs);
app.get("/kbs", getByWhere);
app.get("/find/:id", getById);


app.post("/create", auth, makeKB);

app.get("/users", getUsers),
app.get("/user/:id", getUserById);
app.post("/loginpage", loginUser);

app.post("/updateKb", auth, updateKb);

/* app.get('/todo/:todoId', auth, getOneTodo);
app.post('/todo',auth, postOneTodo);
app.delete('/todo/:todoId',auth, deleteTodo);
app.put('/todo/:todoId',auth, editTodo);
app.post('/postSendMail', postSendMail);
app.get('/testItOut',testItOut)
app.get('/bigben', bigben);
*/
// Users
/* app.post('/login', loginUser);
app.post('/signup', signUpUser);
app.post('/user/image', auth ,uploadProfilePhoto);
app.post('/user', auth ,updateUserDetails);
app.get('/user', auth, getUserDetail);
app.get('/admin/todo', auth, getAdminTodos);*/
exports.api = functions.https.onRequest(app);
import onCreateUser from "./Services/OnCreateUser";

exports.ProccessSignUp = functions.auth.user().onCreate(async (user) => {
  const result = await onCreateUser(user);
  return result;
});



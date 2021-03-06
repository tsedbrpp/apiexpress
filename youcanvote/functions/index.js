const functions = require('firebase-functions');
const app = require('express')();
const auth = require('./util/auth');

const {
    getAllTodos,
    getOneTodo,
    postOneTodo,
    deleteTodo,
    editTodo,
    getAdminTodos
} = require('./APIs/todos')

const {
    loginUser,
    signUpUser,
    uploadProfilePhoto,
    getUserDetail,
    updateUserDetails
} = require('./APIs/users')

const cors = require('cors')({origin: true});
app.use(cors);
// Todos
app.get('/todos', auth, getAllTodos);
app.get('/todo/:todoId', auth, getOneTodo);
app.post('/todo',auth, postOneTodo);
app.delete('/todo/:todoId',auth, deleteTodo);
app.put('/todo/:todoId',auth, editTodo);

// Users
app.post('/login', loginUser);
app.post('/signup', signUpUser);
app.post('/user/image', auth ,uploadProfilePhoto);
app.post('/user', auth ,updateUserDetails);
app.get('/user', auth, getUserDetail);
app.get('/admin/todo', auth, getAdminTodos);
exports.api = functions.https.onRequest(app);


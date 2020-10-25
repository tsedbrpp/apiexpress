const { db } = require('../util/admin');


exports.getAdminTodos = (request, response) => {
    db
        .collection('todos').orderBy('createdAt', 'desc')
        .get()
        .then((data) => {
            let todos = [];
            data.forEach((doc) => {
                todos.push({
                    todoId: doc.id,
                    title: doc.data().title,
                    username: doc.data().username,
                    body: doc.data().body,
                    county:doc.data().body.county,
                    location:doc.data().body.location,
                    category:doc.data().body.category,
                    priority:doc.data().body.priority,
                    status:doc.data().body.status,
                    createdAt: doc.data().createdAt,
                });
            });
            return response.json(todos);
        })
        .catch((err) => {
            console.error(err);
            return response.status(500).json({ error: err.code});
        });
};

exports.getAllTodos = (request, response) => {
    db
        .collection('todos')
        .where('username', '==', request.user.username)
        .orderBy('createdAt', 'desc')
        .get()
        .then((data) => {
            let todos = [];
            data.forEach((doc) => {
                todos.push({
                    todoId: doc.id,
                    title: doc.data().title,
                    username: doc.data().username,
                    body: doc.data().body,
                    county:doc.data().county,
                    location:doc.data().location,
                    category:doc.data().category,
                    priority:doc.data().priority,
                    status:doc.data().status,
                    createdAt: doc.data().createdAt,
                });
            });
            return response.json(todos);
        })
        .catch((err) => {
            console.error(err);
            return response.status(500).json({ error: err.code});
        });
};

exports.getOneTodo = (request, response) => {
    db
        .doc(`/todos/${request.params.todoId}`)
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return response.status(404).json(
                    {
                        error: 'record not found'
                    });
            }
            if(doc.data().username !== request.user.username){
                return response.status(403).json({error:"UnAuthorized"})
            }
            TodoData = doc.data();
            TodoData.todoId = doc.id;
            return response.json(TodoData);
        })
        .catch((err) => {
            console.error(err);
            return response.status(500).json({ error: error.code });
        });
};

exports.postOneTodo = (request, response) => {
    if (request.body.body.trim() === '') {
        return response.status(400).json({ body: 'Must not be empty' });
    }

    if(request.body.title.trim() === '') {
        return response.status(400).json({ title: 'Must not be empty' });
    }
    if(request.body.county.trim() === '') {
        return response.status(400).json({ county: 'Must not be empty' });
    }
    if(request.body.location.trim() === '') {
        return response.status(400).json({ location: 'Must not be empty' });
    }
    if(request.body.category.trim() === '') {
        return response.status(400).json({ category: 'Must not be empty' });
    }
    if(request.body.priority.trim() === '') {
        return response.status(400).json({ priority: 'Must not be empty' });
    }
    if(request.body.status.trim() === '') {
        return response.status(400).json({ status: 'Must not be empty' });
    }

    const newTodoItem = {
        title: request.body.title,
        username: request.user.username,
        body: request.body.body,
        county:request.body.county,
        location:request.body.location,
        category:request.body.category,
        priority:request.body.priority,
        status:request.body.status,
        createdAt: new Date().toISOString()
    }
    console.log("***************" + newTodoItem.status);
    db
        .collection('todos')
        .add(newTodoItem)
        .then((doc)=>{
            const responseTodoItem = newTodoItem;
            responseTodoItem.id = doc.id;
            return response.json(responseTodoItem);
        })
        .catch((error) => {
            console.error(error);
            response.status(500).json({ error: 'Something went wrong' });
        });
};

exports.deleteTodo = (request, response) => {
    const document = db.doc(`/todos/${request.params.todoId}`);
    document
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return response.status(404).json({
                    error: 'record not found'
                })}
            if(doc.data().username !== request.user.username){
                return response.status(403).json({error:"UnAuthorized"})
            }
            return document.delete();
        })
        .then(() => {
            response.json({ message: 'Delete successfull' });
        })
        .catch((err) => {
            console.error(err);
            return response.status(500).json({
                error: err.code
            });
        });
};

exports.editTodo = ( request, response ) => {
    if(request.body.todoId || request.body.createdAt){
        response.status(403).json({message: 'Not allowed to edit'});
    }
    let document = db.collection('todos').doc(`${request.params.todoId}`);
    document.update(request.body)
        .then((doc)=> {
            response.json({message: 'Updated successfully'});
        })
        .catch((error) => {
            if(error.code === 5){
                response.status(404).json({message: 'Not Found'});
            }
            console.error(error);
            return response.status(500).json({
                error: error.code
            });
        });
};

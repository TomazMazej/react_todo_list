const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

// Povezava na bazo
mongoose.connect("mongodb://127.0.0.1:27017/react-todo", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected to DB"))
    .catch(console.error);

const TodoList = require('./models/TodoList')
const Todo = require('./models/Todo')

/******* 
SEZNAMI
*******/
// Dobimo vse sezname
app.get('/lists', async (req, res) => {
    const lists = await TodoList.find();

    res.json(lists);
})

// Dodamo seznam
app.post('/list/new', (req, res) => {
    const list = new TodoList({
        text: req.body.text,
        tag: req.body.tag
    })

    list.save();

    res.json(list);
})

// Izbrisemo seznam
app.delete('/list/delete/:id', async (req, res) => {
    const result = await TodoList.findByIdAndDelete(req.params.id);

    res.json(result);
})

// Uredimo seznam
app.put('/list/edit/:id', async (req, res) => {
    const list = await TodoList.findById(req.params.id);

    list.text = req.body.text;
    list.tag = req.body.tag;

    list.save();

    res.json(list)
})

/******* 
OPRAVILA
*******/
// Dobimo vsa opravila
app.get('/todos', async (req, res) => {
    const todos = await Todo.find();

    res.json(todos);
})

// Dodamo opravilo
app.post('/todo/new', (req, res) => {
    const todo = new Todo({
        text: req.body.text,
        tag: req.body.tag,
        reminder: req.body.reminder,
        date: req.body.date,
        list: req.body.list
    })

    todo.save();

    res.json(todo);
})

// Izbrisemo opravilo
app.delete('/todo/delete/:id', async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);

    res.json(result);
})

// Spremenimo na opravljeno
app.get('/todo/complete/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    todo.complete = !todo.complete;

    todo.save();

    res.json(todo)
})

// Uredimo opravilo
app.put('/todo/edit/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    todo.text = req.body.text;
    todo.tag = req.body.tag;
    todo.reminder = req.body.reminder;
    todo.date = req.body.date;

    todo.save();

    res.json(todo)
})

// Poslušamo na portu 3001
app.listen(3001, () => console.log("Server started on port 3001"));
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Model za seznam opravil
const TodoListSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true
    },
})

const TodoList = mongoose.model("TodoList", TodoListSchema);

module.exports = TodoList;


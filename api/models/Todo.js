const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Model za opravilo
const TodoSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true
    },
    reminder: {
        type: String,
        required: true
    },
    complete: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now,
        format: "dd/MM/yyy"
    },
    list: {
        type: String,
        required: true
    }
})

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;


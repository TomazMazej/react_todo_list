export const Tasks = ( {todos, onDelete, onComplete, onEdit, editedTask, newTodo, newTag, newReminder} ) => {

    const editTask = (todo) => {
        editedTask(todo._id);
        newTodo(todo.text);
        newTag(todo.tag);
        newReminder(todo.reminder);
        onEdit(true);
    }

    const remind = (todo) => {
        var today = new Date();
        console.log(todo.remind)
        today.setDate(today.getDate() + parseInt(todo.reminder));
        if(new Date(todo.date).toDateString() === new Date(today).toDateString()){
            return true;
        }
        return false;
    }

    return (
        <div>
            <h4>Your Tasks</h4>
            <div className="todos">
                {todos.map(todo => (
                    <div className={"todo " + (todo.complete ? "is-complete" : "")} key={ todo._id }>
                        <div className="checkbox" onClick={() => onComplete(todo._id)}></div>
                        <div className={remind(todo) ? "text-reminder" : "text"}>{ todo.text + "(" + todo.tag + ") - " + new Date(todo.date).toDateString() }</div>
                        <div className="delete-todo" onClick={() => onDelete(todo._id)}>x</div>
                        <div className="edit-todo" onClick={() => editTask(todo)}>i</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Tasks

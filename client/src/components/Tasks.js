export const Tasks = ( {todos, onDelete, onComplete, onEdit, editedTask} ) => {

    const editTask = (id) => {
        editedTask(id);
        onEdit(true);
    }

    return (
        <div>
            <h4>Your Tasks</h4>
            <div className="todos">
                {todos.map(todo => (
                    <div className={"todo " + (todo.complete ? "is-complete" : "")} key={ todo._id }>
                        <div className="checkbox" onClick={() => onComplete(todo._id)}></div>
                        <div className="text">{ todo.text + "(" + todo.tag + ") - " + todo.date }</div>
                        <div className="delete-todo" onClick={() => onDelete(todo._id)}>x</div>
                        <div className="edit-todo" onClick={() => editTask(todo._id)}>i</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Tasks

export const Tasks = ( {todos, onDelete, onComplete} ) => {
    return (
        <div>
            <h4>Your Tasks</h4>

            <div className="todos">
                {todos.map(todo => (
                    <div className={"todo " + (todo.complete ? "is-complete" : "")} key={ todo._id } onClick={() => onComplete(todo._id)}>
                        <div className="checkbox"></div>
                        <div className="text">{ todo.text }</div>
                    <div className="delete-todo" onClick={() => onDelete(todo._id)}>x</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Tasks

export const Lists = ( {lists, onDelete, onEdit, editedList, newTodo, newTag} ) => {

    // Preusmeritev na opravila
    const onClick = (id) => {
        window.location.href = `/list/${id}`;
    }

    const editList = (list) => {
        editedList(list._id);
        newTodo(list.text);
        newTag(list.tag);
        onEdit(true);
    }

    return (
        <div>
            <h4>Your Lists</h4>
            <div className="todos">
                {lists.map(list => (
                    <div key={list._id}>
                        <div className="todo" value={list._id} >
                            <div className="text" onClick={() => onClick(list._id)}>{ list.text + "(" + list.tag + ")"}</div>
                            <div className="delete-todo" onClick={() => onDelete(list._id)}>x</div>
                            <div className="edit-todo" onClick={() => editList(list)}>i</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Lists

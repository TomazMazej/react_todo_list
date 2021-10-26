export const Lists = ( {lists, onDelete, handleStateChange} ) => {

    const onClick = (id) => {
        console.log("ID " + id)
        handleStateChange(id);
    }

    return (
        <div>
            <h4>Your Lists</h4>

            <div className="todos">

            {lists.map(list => (
                <div className="todo" onClick={() => onClick(list._id)} value={list._id} >
                <div className="text">{ list.text }</div>
                <div className="text"> ({ list.tag }) </div>
                <div className="delete-todo" onClick={() => onDelete(list._id)}>x</div>
                </div>
            ))}
            </div>
        </div>
    )
}

export default Lists

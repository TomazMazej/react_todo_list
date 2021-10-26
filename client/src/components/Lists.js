export const Lists = ( {lists, onDelete, handleStateChange} ) => {

    const onClick = (id) => {
        handleStateChange(id);
        window.location.href = `/lists/${id}`;
    }

    return (
        <div>
            <h4>Your Lists</h4>

            <div className="todos">

            {lists.map(list => (
                <div key={list._id}>
                    <div className="todo" onClick={() => onClick(list._id)} value={list._id} >
                    <div className="text">{ list.text }</div>
                    <div className="text"> ({ list.tag }) </div>
                    <div className="delete-todo" onClick={() => onDelete(list._id)}>x</div>
                    </div>
                </div>
            ))}
            </div>
        </div>
    )
}

export default Lists

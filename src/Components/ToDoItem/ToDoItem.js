function ToDoItem({ task, deleteTask, toggleCompleted}) {

    function handleEdit() {
        console.log("edit");
    }

    function handleChange() {
        toggleCompleted(task.id);
    }
    
    return (
        <div>
            

            <div className="item">
                <input type="checkbox" checked={task.completed} onChange={handleChange}/>
            <p>{task.name}</p> 
            <p>{task.description}</p>
            <p>{task.end_date}</p>
            <p>{task.priority}</p>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={deleteTask}>Delete</button>
            </div>
        </div>

    )
}

export default ToDoItem;
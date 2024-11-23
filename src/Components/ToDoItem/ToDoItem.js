import React, { useState } from "react";
import EditModal from "../EditModal";

function ToDoItem({ task, deleteTask, toggleCompleted, editTask }) {
    const [isEditing, setIsEditing] = useState(false); //track modal state

    //handler for saving the updated task
    function handleEditSave(updatedTask) {
        editTask(task._id, updatedTask); //save the updated task
        setIsEditing(false); //close modal
    }

     //format the date using Intl.DateTimeFormat
     function formatDate(dateString) {
        if (!dateString) return ""; 
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        }).format(date); 
    }

    return (
        <div className="item">
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleCompleted(task._id)}
            />
            <p>{task.name}</p>
            <p>{task.desc}</p>
            <p>{formatDate(task.end)}</p>
            <p>{task.priority}</p>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => deleteTask(task._id)}>Delete</button>

            {isEditing && (
                <EditModal
                    task={task}
                    onClose={() => setIsEditing(false)}
                    onSave={handleEditSave}
                />
            )}
        </div>
    );
}

export default ToDoItem;


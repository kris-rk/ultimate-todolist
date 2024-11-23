import React, { useState } from "react";

function EditModal({ task, onClose, onSave }) {
    const [updatedTask, setUpdatedTask] = useState(task); //init state with current task data

    //update the state when the user types in the inputs
    function handleInputChange(e) {
        const { name, value } = e.target;
        setUpdatedTask(prev => ({ ...prev, [name]: value }));
    }

    //save the updated task and close the modal
    function handleSave() {
        onSave(updatedTask); //pass the updated task to the parent component
        onClose(); 
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Edit Task</h2>
                <input
                    type="text"
                    name="name" 
                    value={updatedTask.name} 
                    onChange={handleInputChange} 
                    placeholder="Title"
                />
                <input
                    type="text"
                    name="desc" 
                    value={updatedTask.desc} 
                    onChange={handleInputChange} 
                    placeholder="desc"
                />
                <input
                    type="date"
                    name="end" 
                    value={updatedTask.end} 
                    onChange={handleInputChange} 
                />
                <select
                    name="priority" 
                    value={updatedTask.priority} 
                    onChange={handleInputChange} 
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <div className="modal-buttons">
                    <button onClick={handleSave}>Save</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default EditModal;

import React, { useState } from 'react';
import NavbarLoggedIn from "./Components/NavbarLoggedIn/NavbarLoggedIn";


const AddItem = () => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [endDate, setEndDate] = useState('');
  const [priority, setPriority] = useState('');
  const [reminder, setReminder] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'taskName':
        setTaskName(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'endDate':
        setEndDate(value);
        break;
      case 'priority':
        setPriority(value);
        break;
      case 'reminder':
        setReminder(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    
    const newItem = { taskName, description, endDate, priority, reminder };
    const name = taskName;
    const desc = description;
    const end = endDate;
    //console.log('New Item:', newItem); 
    try {
      const response = await fetch('http://localhost:2000/addTask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, desc, end, priority, reminder }),
      });
      const data = await response.json();
      
      //display success or error message based on response
      if (response.ok) {
        window.alert('added task successfully!');
        setMessage(data.message);
      } else {
        setMessage(data.message || ' Failed to add task');
      }
    } catch (error) {
      setMessage('Failed to add task');
    }
    //clear form inputs
    setTaskName('');
    setDescription('');
    setEndDate('');
    setPriority('');
    setReminder('');
  };

  return (
    <div className="add-item-container">
    <NavbarLoggedIn></NavbarLoggedIn>
      <h2>Add New Task</h2>
      <form className="add-item-form" onSubmit={handleSubmit}>
        <div>
          <label>Task Name:</label>
          <input
            type="text"
            name="taskName"
            value={taskName}
            onChange={handleChange}
            placeholder="Enter task name"
            required
          />
        </div>
        <div>
          <label>Description (optional):</label>
          <textarea
            name="description"
            value={description}
            onChange={handleChange}
            placeholder="Enter description"
          ></textarea>
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            name="endDate"
            value={endDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Priority:</label>
          <select name="priority" value={priority} onChange={handleChange}>
            <option value="">Select priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label>Reminder:</label>
          <input
            type="datetime-local"
            name="reminder"
            value={reminder}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="button" onClick={() => {
            setTaskName('');
            setDescription('');
            setEndDate('');
            setPriority('');
            setReminder('');
          }}>
            Cancel
          </button>
          <button type="submit">Add Task</button>
        </div>
      </form>
      
    </div>
  );
};

export default AddItem;

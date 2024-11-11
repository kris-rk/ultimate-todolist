import Navbar from "./Components/Navbar/Navbar";
import ToDoItem from "./Components/ToDoItem/ToDoItem"
import { useState } from 'react'

function ViewItems() {

    const [tasks, setTasks] = useState([
        {
            id: 1,
            name: 'Doctor Appointment',
            description: 'The decription of this',
            end_date: '1/1/2024',
            priority: 'high',
            completed: false
        },
        {
            id: 2,
            name: 'Meeting at School',
            description: 'The decription of this is suuuuuuuuuuuuuuuper long all the time',
            end_date: '1/1/2024',
            priority: 'high',
            completed: false
        },
        {
            id: 3,
            name: 'Project Due',
            description: 'The decription of this',
            end_date: '1/10/2024',
            priority: 'high',
            completed: false
        },
    ]);

    function deleteTask(id) {
        setTasks(tasks.filter(task => task.id !== id))
    }

    function toggleCompleted(id) {
        setTasks(tasks.map(task => {
            if (task.id === id) {
                return {...task, completed: !task.completed};
            } else {
                return task;
            }           
        }));
    }

    return (
        <div className="item-container">
            <Navbar></Navbar>
            <div className="item-top">
                <p>  </p>
                <p>Title</p>
                <p>Description</p>
                <p> End Date </p>
                <p>Priority</p>
            </div>
            {tasks.map(task => (
                <ToDoItem 
                key={task.id}
                task={task}
                deleteTask={deleteTask}
                toggleCompleted={toggleCompleted}
                />
            ))}
        </div>
    )
    
}

export default ViewItems;
import NavbarLoggedIn from "./Components/NavbarLoggedIn/NavbarLoggedIn";
import ToDoItem from "./Components/ToDoItem/ToDoItem"
import { useState, useEffect} from 'react'

function ViewItems() {

    const [tasks, setTasks] = useState([]);
    const [message, setMessage] = useState('');
    
    useEffect(() =>{
        const fetchTasks = async () =>{
            const token = localStorage.getItem('token');
            if(!token){
                setMessage("User is not authenticated. redirecting to login...");
                setTimeout(() =>{
                    window.location.href = '/login';

                }, 2000);
                return;
            }


            try{
                const response = await fetch('http://localhost:2000/getUserTasks', {
                    method: 'GET', 
                    headers: { 
                        Authorization: `Bearer ${token}`, 
                    }, 
                });
        
        
                if(response.ok){
                    const data = await response.json();
                    setTasks(data);
                } else {
                    const errorData = await response.json();
                    setTasks(errorData.message || 'Failed to fetch tasks.');
                }


            } catch(error) {
                console.error('Error Fetching tasks:  ', error); 
                setMessage('Failed to fetch tasks.');            
            }

        };

        fetchTasks();

        
    }, []);


    

    // delete task function
    async function deleteTask(id) {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:2000/deleteTask/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });


            if (response.ok) {
                setTasks(tasks.filter(task => task._id !== id));
                setMessage('Task deleted successfully.');
            } else {
                const errorData = await response.json();
                setMessage(errorData.mesaage || 'Failed to delete task');
            }
        } catch (error) {
            console.error('Error deleting task: ', error);
            setMessage('Failed to delete the task');
        }
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
            <NavbarLoggedIn></NavbarLoggedIn>
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
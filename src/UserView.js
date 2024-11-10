import Navbar from "./Components/Navbar/Navbar";
import {useNavigate } from 'react-router-dom'

function UserView() {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/add_item');
    };

    return (        
        <div>
            <Navbar></Navbar>
            <div className="user-container">
                <button>View Task</button>

                <button onClick={handleClick}>Add Task</button>
            </div>
        </div>
        
    )
}    

export default UserView;
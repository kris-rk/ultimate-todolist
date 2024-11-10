import Navbar from "./Components/Navbar/Navbar";
import {useNavigate } from 'react-router-dom'

function UserView() {

    // navigation for buttons
    const navigate = useNavigate();

    const handleAddClick = () => {
        navigate('/add_item');
    };

    const handleViewClick = () => {
        navigate('/view_items');
    };

    return (        
        <div>
            <Navbar></Navbar>
            <div className="user-container">
                <button onClick={handleViewClick}>View Task</button>

                <button onClick={handleAddClick}>Add Task</button>
            </div>
        </div>
        
    )
}    

export default UserView;
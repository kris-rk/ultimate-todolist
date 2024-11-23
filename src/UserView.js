import NavbarLoggedIn from "./Components/NavbarLoggedIn/NavbarLoggedIn";
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
            <NavbarLoggedIn></NavbarLoggedIn>
            <div className="user-container">
                <button onClick={handleViewClick}>View Tasks</button>

                <button onClick={handleAddClick}>Add Task</button>
            </div>
        </div>
        
    )
}    

export default UserView;
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './Home'
import Login from './Login'
import Register from './Register'
import AddItem from './AddItem'
import UserView from './UserView'

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/add_item" element={<AddItem/>} />
          <Route path="/user_home" element={<UserView/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

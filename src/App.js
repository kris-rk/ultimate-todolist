import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './Home'
import Login from './Login'
import Register from './Register'

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

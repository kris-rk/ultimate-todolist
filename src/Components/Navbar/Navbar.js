import React, { useState } from 'react';
import './Navbar.css'; 
import logo from './logo.png';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header>
      <a className="logo" href="/">
        <img src={logo} alt="ultimate-logo" />
      </a>
      <nav>
        <ul className="nav__links">
          <li><a href="/Login">Login</a></li>
          <li><a href="/Register">Register</a></li>
          
        </ul>
      </nav>
      

      
    </header>
  );
}

export default Navbar;

import React, { useState } from 'react';
import './Navbar.css'; 
import logo from './logo.png';
import { useLocation } from 'react-router-dom';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };



  const isHome = location.pathname === '/';
  return (
    <header className={`navbar ${isHome ? 'home-navbar' : ''}`}>
      <a className={`logo ${isHome ? 'home-logo' : ''}`}href="/">
        <img src={logo} alt="ultimate-logo" />
      </a>
      <nav>
        {!isHome && (
          <ul className="nav__links">
          <li><a href="/Login">Login</a></li>
          <li><a href="/Register">Register</a></li>
          </ul>
        )}; 
        
      </nav>
      
      
    </header>
  );
}

export default Navbar;

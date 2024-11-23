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
      <a className={`logo ${isHome ? 'home-logo' : ''}`}href="/user_home">
        <img src={logo} alt="ultimate-logo" />
      </a>
      <nav>
        {!isHome && (
          <ul className="nav__links">
          <li><a href="/user_home">Home</a></li>
          <li><a href="/">Log Out</a></li>
          </ul>
        )}; 
        
      </nav>
      
      
    </header>
  );
}

export default Navbar;

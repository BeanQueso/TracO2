import React from 'react';
import './Header.css';
import logo from "./logo.png";
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="Header-main">
      <header className="header">
        <Link to='/'>
        <h1 className="header-text">TraCO<sup>2</sup></h1>
        
        </Link>
        <Link to="/">
          <img src={logo} className="App-logo" alt="Logo" />
        </Link>
      </header>
    </div>
  );
}

export default Header;

import React from 'react';
import './Header.css';

const Header = ({ username, onLogout }) => {
  return (
    <header className="header">
      <div className="header-container">
        <h1>Task Tracker</h1>
        <div className="user-info">
          <span>Welcome, {username}</span>
          <button onClick={onLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
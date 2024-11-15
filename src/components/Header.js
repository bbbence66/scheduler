import React from 'react';
import './Header.css';

const Header = ({ username, onLogout }) => {
    return (
        <header className="header">
            <div className="header-right">
                <button className="management-btn">
                    Management
                </button>
                <span>Welcome back, {username}</span>
                <button className="logout-btn" onClick={onLogout}>
                    Logout
                </button>
            </div>
        </header>
    );
};

export default Header; 
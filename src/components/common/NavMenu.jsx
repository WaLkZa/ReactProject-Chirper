import React from 'react';
import { NavLink } from 'react-router-dom';
import authService from "../utils/services/authService";

const NavMenu = () => {
    return (
        <div className="menu">
            <NavLink to="/feed" className={({ isActive }) => isActive ? 'nav-active' : ''}>Home</NavLink>
            <NavLink to="/discover" className={({ isActive }) => isActive ? 'nav-active' : ''}>Discover</NavLink>
            <NavLink to="/profile" className={({ isActive }) => isActive ? 'nav-active' : ''}>Me</NavLink>
            {authService.isAdmin() && (
                <NavLink to="/admin" className={({ isActive }) => isActive ? 'nav-active' : ''}>Admin panel</NavLink>
            )}
            <NavLink to="/logout" className={({ isActive }) => isActive ? 'nav-active' : ''}>Logout</NavLink>
        </div>
    );
};

export default NavMenu;
import React from 'react';
import { NavLink } from 'react-router-dom';
import authService from "../utils/services/authService";

const NavMenu = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarMenu"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarMenu">
                    {/* "Home", "Discover", "Me" отляво */}
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <NavLink
                                to="/feed"
                                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/discover"
                                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                            >
                                Discover
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/profile"
                                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                            >
                                Me
                            </NavLink>
                        </li>
                        {authService.isAdmin() && (
                            <li className="nav-item">
                                <NavLink
                                    to="/admin"
                                    className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                                >
                                    Admin panel
                                </NavLink>
                            </li>
                        )}
                    </ul>

                    {/* "Logout" отдясно */}
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <NavLink
                                to="/logout"
                                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                            >
                                Logout
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavMenu;
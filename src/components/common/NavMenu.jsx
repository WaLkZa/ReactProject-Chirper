import React, { Component } from "react"
import { NavLink } from 'react-router-dom'
import authService from "../utils/services/authService";

class NavMenu extends Component {
    render() {
        return (
            <div className="menu">
                <NavLink to="/feed">Home</NavLink>
                <NavLink to="/discover">Discover</NavLink>
                <NavLink to="/profile">Me</NavLink>
                {authService.isAdmin() && <NavLink to="/admin">Admin panel</NavLink>}
                <NavLink to="/logout">Logout</NavLink>
            </div>
        )
    }
}

export default NavMenu
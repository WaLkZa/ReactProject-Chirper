import React, { Component } from "react"
import { NavLink } from 'react-router-dom'
import authService from "../utils/services/authService";

class NavMenu extends Component {
    render() {
        return (
            <div className="menu">
                <NavLink to="/feed" activeClassName="nav-active">Home</NavLink>
                <NavLink to="/discover" activeClassName="nav-active">Discover</NavLink>
                <NavLink to="/profile" activeClassName="nav-active">Me</NavLink>
                {authService.isAdmin() && <NavLink to="/admin" activeClassName="nav-active">Admin panel</NavLink>}
                <NavLink to="/logout">Logout</NavLink>
            </div>
        )
    }
}

export default NavMenu
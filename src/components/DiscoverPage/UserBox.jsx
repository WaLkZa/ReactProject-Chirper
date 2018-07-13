import React from "react"
import { Link } from 'react-router-dom'
import authService from "../utils/services/authService";

let UserBox = (props) => {
    return (
        <div className="userbox">
            <div><Link to={`/feed/:${props.username}`} className="chirp-author">{props.username}</Link></div>

            <div className="user-details">
                {authService.isAdmin() ? <Link to={`/deleteUser/:${props._id}`}>delete user   </Link> : null}
                <span> {props.followers} followers</span>
            </div>
        </div>
    )
}

export default UserBox
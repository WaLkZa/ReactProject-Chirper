import React from "react"
import { Link } from 'react-router-dom'

let UserBox = (props) => {
    return (
        <div className="userbox">
            <div><Link to={`/feed/:${props.username}`} className="chirp-author">{props.username}</Link></div>

            <div className="user-details">
                <span>{props.followers} followers</span>
            </div>
        </div>
    )
}

export default UserBox
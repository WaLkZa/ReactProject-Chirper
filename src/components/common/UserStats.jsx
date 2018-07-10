import React from "react"

let UserStats = (props) => {
    return (
        <div id="userStats" className="user-details">
            <span>{props.chirpsCount} chirps</span> | <span>{props.following} following</span> | <span>{props.followers} followers</span>
        </div>
    )
}

export default UserStats
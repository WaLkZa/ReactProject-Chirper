import React from "react";

const UserStats = ({ chirpsCount, following, followers }) => {
    return (
        <div id="userStats" className="user-details">
            <span>{chirpsCount} chirps</span> | <span>{following} following</span> | <span>{followers} followers</span>
        </div>
    );
};

export default UserStats;
import React from "react";

const UserStats = ({ username, chirpsCount, following, followers }) => {
    return (
        <div className="card-header d-flex justify-content-between">
            <h5 className="mb-0">{username}</h5>
            <div id="myStats" className="text-muted small">
                <span>{chirpsCount} chirps</span> | <span>{following} following</span> | <span>{followers} followers</span>
            </div>
        </div>
    );
};

export default UserStats;
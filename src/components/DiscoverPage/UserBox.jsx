import React from "react";
import { Link } from 'react-router-dom';
import authService from "../utils/services/authService";

const UserBox = ({ name, id }) => {
    return (
        <div className="userbox">
            <div>
                <Link to={`/feed/${id}`} className="chirp-author">{name}</Link>
            </div>

            <div className="user-details">
                {authService.isAdmin() && (
                    <Link to={`/deleteUser/${id}`}>delete user</Link>
                )}
                {/* <span> {followers} followers</span> */}
            </div>
        </div>
    );
};

export default UserBox;
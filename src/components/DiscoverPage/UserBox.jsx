import React from "react";
import { Link } from 'react-router-dom';
import authService from "../utils/services/authService";

const UserBox = ({ name, id, chirps }) => {
    return (
        <div className="d-flex justify-content-between align-items-center border-bottom py-2">
            <Link to={`/feed/${id}`} className="chirp-author">{name}</Link>

            {authService.isAdmin() && (
                <Link to={`/deleteUser/${id}`}><i class="bi bi-trash3-fill"></i></Link>
            )}
            <span className="text-muted small">{chirps.length} chirps</span>
        </div>
    );
};

export default UserBox;
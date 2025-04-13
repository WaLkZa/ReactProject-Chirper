import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import usersService from '../utils/services/usersService';
import { toast } from 'react-toastify';

const UnfollowUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        usersService.followUser(id)
            .then(() => {
                toast.info("User unfollowed.", {
                    position: 'top-right'
                });

                navigate(`/feed/${id}`);
            })
    }, []);

    return null;
};

export default UnfollowUser;
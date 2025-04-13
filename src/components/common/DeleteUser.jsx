import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import usersService from '../utils/services/usersService';

const DeleteUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        usersService.deleteUser(id)
            .then(() => {
                toast.info("User deleted.", {
                    position: 'top-right'
                });

                navigate('/discover');
            })
            .catch((reason) => {
                toast.error(reason, {
                    position: 'top-right'
                });
            });
    }, []);

    return null;
};

export default DeleteUser;
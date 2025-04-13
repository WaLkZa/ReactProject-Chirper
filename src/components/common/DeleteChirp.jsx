import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import chirpsService from '../utils/services/chirpsService';
import { toast } from 'react-toastify';
import authService from '../utils/services/authService';

const DeleteChirp = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        chirpsService.deleteChirp(id)
            .then(() => {
                toast.info("Chirp deleted.", {
                    position: 'top-right'
                });
                
                if (!authService.isAdmin()) {
                    navigate('/profile');
                }
            })
            .catch((reason) => {
                toast.error(reason, {
                    position: 'top-right'
                });
            });
    }, []);

    return null;
};

export default DeleteChirp;
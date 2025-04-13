import React from 'react';
import { Navigate } from 'react-router-dom';
import authService from '../utils/services/authService';

const WelcomePage = () => {
    return <Navigate to={authService.isAuth() ? '/feed' : '/login'} replace />;
};

export default WelcomePage;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../utils/services/authService';
import { toast } from 'react-toastify';

const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const onChangeHandler = (ev) => {
        const { name, value } = ev.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const onSubmitHandler = async (ev) => {
        ev.preventDefault();

        try {
            const userInfo = await authService.login(formData.username, formData.password);
            authService.saveSession(userInfo);

            toast.success("Login successful.", {
                position: 'bottom-right'
            });

            navigate('/feed');
        } catch (error) {
            toast.error(error?.response?.data?.description || 'Login failed', {
                position: 'top-right'
            });
        }
    };

    return (
        <div>
            <form id="formLogin" className="form chirps" onSubmit={onSubmitHandler}>
                <label>Username</label>
                <input name="username" type="text" value={formData.username} onChange={onChangeHandler} />
                <label>Password</label>
                <input name="password" type="password" value={formData.password}onChange={onChangeHandler} />
                <input id="btnLogin" value="Sign In" type="submit" />
                <Link to="/register">Register</Link>
            </form>
        </div>
    );
};

export default LoginPage;
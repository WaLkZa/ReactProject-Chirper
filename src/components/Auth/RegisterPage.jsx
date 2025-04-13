import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../utils/services/authService';
import { toast } from 'react-toastify';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        repeatPass: ''
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
            const userInfo = await authService.register(formData.username, formData.password);
            authService.saveSession(userInfo);

            toast.success("Registration successful. You are now logged in!", {
                position: 'bottom-right'
            });

            navigate('/feed');
        } catch (error) {
            toast.error(error?.response?.data?.description || 'Registration failed', {
                position: 'top-right'
            });
        }
    };

    return (
        <form className="form chirps" id="formRegister" onSubmit={onSubmitHandler}>
            <label>Username</label>
            <input name="username" type="text" value={formData.username} onChange={onChangeHandler} />
            <label>Password</label>
            <input name="password" type="password" value={formData.password} onChange={onChangeHandler} />
            <label>Repeat Password</label>
            <input name="repeatPass" type="password" value={formData.repeatPass} onChange={onChangeHandler} />
            <input id="btnRegister" value="Register" type="submit" />
            <Link to="/login">Log in</Link>
        </form>
    );
};

export default RegisterPage;
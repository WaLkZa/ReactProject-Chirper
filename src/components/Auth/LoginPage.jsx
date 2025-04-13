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
        <div className="container">
            <div className="row justify-content-center m-2">
                <div className="col-md-6 col-lg-4">
                    <form
                        id="formLogin"
                        className="form text-center border rounded p-4 shadow-sm bg-white"
                        onSubmit={onSubmitHandler}
                    >
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                name="username"
                                type="text"
                                className="form-control"
                                value={formData.username}
                                onChange={onChangeHandler}
                                id="username"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                name="password"
                                type="password"
                                className="form-control"
                                value={formData.password}
                                onChange={onChangeHandler}
                                id="password"
                                required
                            />
                        </div>
                        <button
                            id="btnLogin"
                            type="submit"
                            className="btn btn-primary w-100 mb-3"
                        >
                            Sign In
                        </button>
                        <div className="mt-2">
                            <Link to="/register" className="text-decoration-none">
                                Register
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
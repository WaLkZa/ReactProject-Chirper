import React, { useState, useEffect } from "react";
import usersService from './../utils/services/usersService';
import UserBox from './UserBox';
import NavMenu from "../common/NavMenu";
import { toast } from 'react-toastify';

const DiscoverPage = () => {
    const [state, setState] = useState({
        users: [],
        count: 0
    });

    useEffect(() => {
        usersService.loadAllUsers()
            .then((result) => {
                result.users = result.users.filter(u => u.name !== localStorage.getItem('username'))

                setState({
                    users: result.users,
                    count: result.users.length
                });
            })
            .catch((reason) => {
                toast.error(reason, {
                    position: 'top-right'
                });
            });
    }, []); // Run once on mount

    return (
        <div>
            <NavMenu />
            <div className="content">
                <div className="chirps">
                    <h2 className="titlebar">Discover ({state.count} users in database)</h2>
                    <div id="userlist">
                        {state.users.map(user => (
                            <UserBox key={user.id} {...user} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiscoverPage;
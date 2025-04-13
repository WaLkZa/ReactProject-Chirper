import React, { useState, useEffect } from "react";
import UserStats from './../common/UserStats';
import CreateChirpForm from "../common/CreateChirpForm";
import ChirpsList from "../common/ChirpsList";
import chirpsService from '../utils/services/chirpsService';
import usersService from '../utils/services/usersService';
import dateConvertor from './../utils/dateConvertor';
import NavMenu from "../common/NavMenu";
import { toast } from 'react-toastify';

const HomePage = () => {
    const [state, setState] = useState({
        username: '',
        chirpsCount: 0,
        following: 0,
        followers: 0,
        chirps: [],
        title: 'Feed'
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const username = localStorage.getItem('username');

                const allChirps = await chirpsService.loadAllFollowedChirps();

                const chirps = allChirps.chirps.map(chirp => {
                    return {
                        ...chirp,
                        user: {
                            id: chirp.userId,
                            name: chirp.username
                        },
                        isAuthor: chirp.userId === localStorage.getItem('userId'),
                        time: dateConvertor(chirp.dateCreated)
                    };
                });

                const chirpsCount = allChirps.chirps.length;
                const following = 0
                const followers = 0

                setState(prevState => ({
                    ...prevState,
                    username,
                    chirpsCount,
                    following,
                    followers,
                    chirps
                }));

            } catch (error) {
                toast.error(error?.response?.data?.description || 'An error occurred', {
                    position: 'top-right'
                });
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <NavMenu />
            <div className="container">
                <div className="row justify-content-center m-2">
                    <div className="col-md-6 col-lg-8">
                        <ChirpsList {...state} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
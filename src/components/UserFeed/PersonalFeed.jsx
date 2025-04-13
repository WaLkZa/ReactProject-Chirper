import React, { useState, useEffect } from 'react';
import chirpsService from '../utils/services/chirpsService';
import usersService from '../utils/services/usersService';
import dateConvertor from '../utils/dateConvertor';
import CreateChirpForm from '../common/CreateChirpForm';
import UserStats from '../common/UserStats';
import ChirpsList from '../common/ChirpsList';
import NavMenu from '../common/NavMenu';
import { toast } from 'react-toastify';

const PersonalFeed = () => {
    const [state, setState] = useState({
        username: '',
        chirpsCount: 0,
        following: 0,
        followers: 0,
        chirps: 0,
        isCurrentlyLogged: false,
        isFollowed: false,
        title: 'My Chirps'
    });

    const userId = localStorage.getItem('userId');

    const refreshChirps = () => {
        Promise.all([
            chirpsService.loadAllChirpsByUserID(userId),
            usersService.loadUserStats(userId)
        ])
            .then(([resultChirps, resultStats]) => {
                const chirps = resultChirps.chirps;
                const chirpsCount = chirps.length;
                const following = resultStats.stats[0].followingCount;
                const followers = resultStats.stats[0].followersCount;

                chirps.forEach(c => {
                    c.time = dateConvertor(c.dateCreated);
                    c.isAuthor = c.userId == userId;
                });

                setState(prevState => ({
                    ...prevState,
                    chirpsCount,
                    following,
                    followers,
                    chirps,
                }));
            })
            .catch((reason) => {
                toast.error(reason.responseJSON?.message || reason.message, {
                    position: 'top-right'
                });
            });
    };

    useEffect(() => {
        const username = localStorage.getItem('username');

        setState(prevState => ({
            ...prevState,
            username
        }));

        refreshChirps();
    }, []);

    return (
        <div>
            <NavMenu />
            <div className="content">
                <div className="chirper">
                    <h2 className="titlebar">{state.username}</h2>
                    <CreateChirpForm onChirpCreated={refreshChirps} />
                    <UserStats {...state} />
                </div>
                <ChirpsList {...state} />
            </div>
        </div>
    );
};

export default PersonalFeed;
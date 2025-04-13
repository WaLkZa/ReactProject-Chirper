import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import chirpsService from '../utils/services/chirpsService';
import usersService from '../utils/services/usersService';
import dateConvertor from '../utils/dateConvertor';
import UserStats from '../common/UserStats';
import ChirpsList from '../common/ChirpsList';
import NavMenu from '../common/NavMenu';
import { toast } from 'react-toastify';

const OtherUserFeed = () => {
    const { id } = useParams();
    const [state, setState] = useState({
        userId: '',
        chirpsCount: 0,
        following: 0,
        followers: 0,
        chirps: 0,
        isCurrentlyLogged: false,
        isFollowed: false,
        title: ''
    });

    useEffect(() => {
        // usersService.loadUserById(id)
        //     .then(user => {
        //         console.log(user)
        //         setState(prevState => ({
        //             ...prevState,
        //             isFollowed: false,
                    
        //         }))
        //     })

        Promise.all([
            usersService.loadUserById(id),
            usersService.loadUserStats(id),
            usersService.isUserFollowed(id)
        ])
            .then(([resultUser, resultStats, resultIsFollowed]) => {
                const chirpsArr = resultUser.user.chirps;
                const chirpsCount = chirpsArr.length;
                const following = resultStats.stats[0].followingCount;
                const followers = resultStats.stats[0].followersCount;

                chirpsArr.forEach(c => {
                    c.time = dateConvertor(c.dateCreated);
                    c.isAuthor = c.author === localStorage.getItem('username');
                    c.user = { id: resultUser.user.id, name: resultUser.user.name };
                });

                setState(prevState => ({
                    ...prevState,
                    userId: resultUser.user.id,
                    username: resultUser.user.name,
                    chirpsCount,
                    following,
                    followers,
                    isFollowed: resultIsFollowed.isFollowed,
                    chirps: chirpsArr,
                    title: `${resultUser.user.name}'s Chirps`
                }));
            })
            .catch((reason) => {
                toast.error(reason, {
                    position: 'top-right'
                });
            });
    }, [id]); // Run when id changes

    return (
        <div>
            <NavMenu />
            <div className="content">
                <div className="chirper">
                    <h2 className="titlebar">{state.username}</h2>

                    {state.isFollowed ? (
                        <Link
                            id="btnFollow"
                            className="chirp-author"
                            to={`/unfollow/${state.userId}`}
                        >
                            Unfollow
                        </Link>
                    ) : (
                        <Link
                            id="btnFollow"
                            className="chirp-author"
                            to={`/follow/${state.userId}`}
                        >
                            Follow
                        </Link>
                    )}

                    <UserStats {...state} />
                </div>

                <ChirpsList {...state} />
            </div>
        </div>
    );
};

export default OtherUserFeed;
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
    }, [id]); 

    return (
        <div>
            <NavMenu />
            <div className="container">
                <div className="row justify-content-center m-2">
                    <div className="col-md-6 col-lg-8">
                        <div className="card mb-3">
                            <UserStats {...state} />

                            <div className="card-body">
                                {state.isFollowed ? (
                                    <Link
                                        id="btnFollow"
                                        className="btn btn-primary"
                                        to={`/unfollow/${state.userId}`}
                                    >
                                        Unfollow
                                    </Link>
                                ) : (
                                    <Link
                                        id="btnFollow"
                                        className="btn btn-primary"
                                        to={`/follow/${state.userId}`}
                                    >
                                        Follow
                                    </Link>
                                )}
                            </div>
                        </div>

                        <ChirpsList {...state} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OtherUserFeed;
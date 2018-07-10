import React, { Component } from 'react';
import chirpsService from '../utils/services/chirpsService';
import usersService from '../utils/services/usersService';
import dateConvertor from '../utils/dateConvertor';
import UserStats from '../common/UserStats';
import ChirpsList from '../common/ChirpsList';
import NavMenu from '../common/NavMenu';
import { Link } from 'react-router-dom';

class OtherUserFeed extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            chirpsCount: 0,
            following: 0,
            followers: 0,
            chirps: 0,
            isCurrentlyLogged: false,
            isFollowed: false
        }
    }

    componentDidMount() {
        let username = this.props.match.params.username.substr(1);

        this.setState({
            username: username,
            isFollowed: JSON.parse(localStorage.getItem('subscriptions')).includes(username)
        })

        Promise.all(
            [
                chirpsService.loadAllChirpsByUsername(username),
                usersService.loadUserFollowers(username),
                usersService.loadUserByUsername(username)
            ]
        )
            .then(([chirpsArr, followersArr, user]) => {
                let chirpsCount = chirpsArr.length;
                let following = user[0].subscriptions.length;
                let followers = followersArr.length;

                chirpsArr.forEach(c => {
                    c.time = dateConvertor(c._kmd.ect);
                    c.isAuthor = c.author === localStorage.getItem('username');
                });

                this.setState({
                    chirpsCount: chirpsCount,
                    following: following,
                    followers: followers,
                    chirps: chirpsArr
                })
            }).catch()
    }

    render() {
        return (
            <div>
                <NavMenu />
                <div className="content">
                    <div className="chirper">

                        <h2 className="titlebar">{this.state.username}</h2>

                        {this.state.isFollowed ?
                            <Link id="btnFollow" className="chirp-author" to={`/unfollow/:${this.state.username}`}>Unfollow</Link>
                            : <Link id="btnFollow" className="chirp-author" to={`/follow/:${this.state.username}`}>Follow</Link>
                        }

                        <UserStats {...this.state} />
                    </div>

                    <ChirpsList {...this.state} />
                </div>
            </div>

        )
    }
}

export default OtherUserFeed;
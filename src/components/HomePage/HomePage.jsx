import React, { Component } from "react";
import UserStats from './../common/UserStats';
import CreateChirpForm from "../common/CreateChirpForm";
import ChirpsList from "../common/ChirpsList";
import chirpsService from '../utils/services/chirpsService'
import usersService from '../utils/services/usersService'
import dateConvertor from './../utils/dateConvertor'
import NavMenu from "../common/NavMenu";

class HomePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            chirpsCount: 0,
            following: 0,
            followers: 0,
            chirps: []
        }
    }

    componentDidMount() {
        let subsArr = JSON.parse(localStorage.getItem('subscriptions')).map(e => `"${e}"`);
        let username = localStorage.getItem('username');

        this.setState({username: username})

        Promise.all([chirpsService.loadAllChirpsByUsername(username), usersService.loadUserFollowers(username)])
            .then(([chirpsArr, followersArr]) => {
                let chirpsCount = chirpsArr.length;
                let following = JSON.parse(localStorage.getItem('subscriptions')).length;
                let followers = followersArr.length;

                chirpsService.loadFollowersChirps(subsArr)
                    .then((followersChirps) => {
                        followersChirps.forEach(c => {
                            c.time = dateConvertor(c._kmd.ect);
                        });

                        this.setState({
                            chirpsCount: chirpsCount,
                            following: following,
                            followers: followers,
                            chirps: followersChirps
                        })

                    }).catch(
                        //notify.handleError
                    )
            }).catch(
                //notify.handleError
            )
    }

    render() {
        return (
            <div>
                <NavMenu />
                <div className="content">
                    <div className="chirper">

                        <h2 className="titlebar">{this.state.username}</h2>

                        <CreateChirpForm />

                        <UserStats {...this.state} />
                    </div>

                    <ChirpsList {...this.state} />
                </div>
            </div>

        )
    }
}

export default HomePage
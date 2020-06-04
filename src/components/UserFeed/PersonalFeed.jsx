import React, { Component } from 'react'
import chirpsService from '../utils/services/chirpsService'
import usersService from '../utils/services/usersService'
import dateConvertor from '../utils/dateConvertor'
import CreateChirpForm from '../common/CreateChirpForm'
import UserStats from '../common/UserStats'
import ChirpsList from '../common/ChirpsList'
import NavMenu from '../common/NavMenu'
import { toast } from 'react-toastify'

class PersonalFeed extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            chirpsCount: 0,
            following: 0,
            followers: 0,
            chirps: 0,
            isCurrentlyLogged: false,
            isFollowed: false,
            title: 'My Chirps'
        }
    }

    componentDidMount() {
        let username = localStorage.getItem('username')
        let userId = localStorage.getItem('userId')

        this.setState({ username: username })

        Promise.all(
            [
                chirpsService.loadAllChirpsByUserID(userId),
                usersService.loadUserStats(userId)
            ]
        )
            .then(([resultChirps, resultStats]) => {
                let chirps = resultChirps.chirps;

                let chirpsCount = chirps.length
                let following = resultStats.stats[0].followingCount;
                let followers = resultStats.stats[0].followersCount;

                chirps.forEach(c => {
                    c.time = dateConvertor(c.dateCreated)
                    c.isAuthor = c.userId == userId
                })

                this.setState({
                    chirpsCount: chirpsCount,
                    following: following,
                    followers: followers,
                    chirps: chirps,
                })
            }).catch((reason) => {
                toast.error(reason.responseJSON.message, {
                    position: toast.POSITION.TOP_RIGHT
                })
            })
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

export default PersonalFeed
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

        this.setState({ username: username })

        Promise.all(
            [
                chirpsService.loadAllChirpsByUsername(username),
                usersService.loadUserFollowers(username),
                usersService.loadUserByUsername(username)
            ]
        )
            .then(([chirpsArr, followersArr, user]) => {
                let chirpsCount = chirpsArr.length
                let following = user[0].subscriptions.length
                let followers = followersArr.length

                chirpsArr.forEach(c => {
                    c.time = dateConvertor(c._kmd.ect)
                    c.isAuthor = c.author === localStorage.getItem('username')
                })

                this.setState({
                    chirpsCount: chirpsCount,
                    following: following,
                    followers: followers,
                    chirps: chirpsArr,
                })
            }).catch((reason) => {
                toast.error(reason.responseJSON.description, {
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
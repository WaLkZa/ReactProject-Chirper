import React, { Component } from "react"
import UserStats from './../common/UserStats'
import CreateChirpForm from "../common/CreateChirpForm"
import ChirpsList from "../common/ChirpsList"
import chirpsService from '../utils/services/chirpsService'
import usersService from '../utils/services/usersService'
import dateConvertor from './../utils/dateConvertor'
import NavMenu from "../common/NavMenu"
import { toast } from 'react-toastify'

class HomePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            chirpsCount: 0,
            following: 0,
            followers: 0,
            chirps: [],
            title: 'Latest 10 Chirps'
        }
    }

    componentDidMount() {
        let username = localStorage.getItem('username')

        this.setState({username: username})

        Promise.all(
            [
                chirpsService.loadAllChirpsByUsername(username),
                chirpsService.loadLatestXChirps(10),
                usersService.loadUserFollowers(username)
            ]
        )
            .then(([chirpsByUser ,allChirps, followersArr]) => {
                let chirpsCount = chirpsByUser.length
                let following = JSON.parse(localStorage.getItem('subscriptions')).length
                let followers = followersArr.length

                allChirps.forEach(c => {
                    c.time = dateConvertor(c._kmd.ect)
                    c.isAuthor = c.author === localStorage.getItem('username')
                })

                this.setState({
                    chirpsCount: chirpsCount,
                    following: following,
                    followers: followers,
                    chirps: allChirps
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

export default HomePage
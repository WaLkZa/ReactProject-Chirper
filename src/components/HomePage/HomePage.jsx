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
            title: 'Chirps from all followed users by you'
        }
    }

    componentDidMount() {
        let username = localStorage.getItem('username')

        this.setState({ username: username })
        
        let allFollowedChirps = []

        let users = JSON.parse(localStorage.getItem('subscriptions'))
        
        for (let user of users) {
            allFollowedChirps.push(chirpsService.loadAllChirpsByUsername(user))
        }

        Promise.all(allFollowedChirps)
            .then(arr => {
                if (arr.length > 0) {
                    let allChirpsInOneArray = arr.reduce((result, current) => {
                        return result.concat(current)
                    })

                    allChirpsInOneArray.forEach(c => {
                        c.time = dateConvertor(c._kmd.ect)
                    })

                    this.setState({
                        chirps: allChirpsInOneArray
                    })
                }
            })
            .catch((reason) => {
                toast.error(reason.responseJSON.description, {
                    position: toast.POSITION.TOP_RIGHT
                })
            })

        Promise.all(
            [
                chirpsService.loadAllChirpsByUsername(username),
                usersService.loadUserFollowers(username)
            ]
        ).then(([chirpsByUser, followersArr]) => {
                let chirpsCount = chirpsByUser.length
                let following = JSON.parse(localStorage.getItem('subscriptions')).length
                let followers = followersArr.length

                this.setState({
                    chirpsCount: chirpsCount,
                    following: following,
                    followers: followers,
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
import React, { Component } from "react";
import usersService from './../utils/services/usersService'
import UserBox from './UserBox';
import NavMenu from "../common/NavMenu";

class DiscoverPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            users: []
        }
    }

    componentDidMount() {
        usersService.loadAllUsers()
            .then((users) => {
                users.forEach(user => {
                    user.followers = users.filter(u => u.subscriptions.includes(user.username)).length;
                });
                users = users.filter(u => u.username !== localStorage.getItem('username'));

                users = users.sort((a, b) => b.followers - a.followers); // sort by descending followers

                this.setState({users: users})

            }).catch()
    }

    render() {
        return (
            <div>
                <NavMenu />
                <div className="content">
                    <div className="chirps">
                        <h2 className="titlebar">Discover</h2>
                        <div id="userlist">
                            {this.state.users.map(user => {
                                return <UserBox key={user._id} {...user} />
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DiscoverPage
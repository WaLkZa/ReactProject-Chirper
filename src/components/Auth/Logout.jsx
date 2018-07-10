import React, { Component } from 'react'
import { Redirect } from 'react-router'
import authService from '../utils/services/authService'

class Logout extends Component {
    render() {
        authService.logout()
            .then(() => {
                //TODO message
                sessionStorage.clear()
                })

        return (
            <Redirect to="/login" />
        )
    }
}

export default Logout
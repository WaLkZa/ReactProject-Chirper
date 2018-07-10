import React from 'react'
import { Redirect } from 'react-router'
import authService from '../utils/services/authService'

let Logout = () => {
    authService.logout()
        .then(() => {
            //TODO message
            localStorage.clear()
        })

    return (
        <Redirect to="/login" />
    )
}

export default Logout
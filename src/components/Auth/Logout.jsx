import React from 'react'
import { Redirect } from 'react-router'
import authService from '../utils/services/authService'
import { toast } from 'react-toastify'

let Logout = () => {
    authService.logout()
        .then(() => {
            localStorage.clear()
        }).catch((reason) => {
            toast.error(reason.responseJSON.description, {
                position: toast.POSITION.TOP_RIGHT
            })
        })
    
    toast.success("Logout successful.", {
        position: toast.POSITION.BOTTOM_RIGHT
    })

    return (
        <Redirect to="/login" />
    )
}

export default Logout
import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Logout = () => {
    const [isLoggedOut, setIsLoggedOut] = useState(false)

    useEffect(() => {
        if (!isLoggedOut) {
            localStorage.clear()
            toast.success("Logout successful.", {
                position: 'bottom-right'
            })
            setIsLoggedOut(true)
        }
    }, [isLoggedOut])

    if (isLoggedOut) {
        return <Navigate to="/login" replace />
    }

    return null
}

export default Logout
import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-secondary text-center text-white">
            <p>Chirper SPA © {new Date().getFullYear()}</p>
        </footer>
    )
}

export default Footer
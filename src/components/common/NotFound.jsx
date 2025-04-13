import React from 'react';

const NotFound = () => {
    return (
        <div className="container d-flex justify-content-center align-items-center">
            <div className="text-center">
                <div className="display-1 text-danger">
                    <i className="bi bi-x-circle"></i>
                </div>
                <h1 className="display-3 text-dark">404</h1>
                <p className="lead text-muted">Oops! The page you are looking for does not exist.</p>
                <a href="/" className="btn btn-primary">Go back to Home</a>
            </div>
        </div>
    );
};

export default NotFound;
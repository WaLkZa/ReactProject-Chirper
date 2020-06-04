import requester from "../requester";

function isAuth() {
    return localStorage.getItem('authtoken') !== null;
}

function isAdmin() {
    return localStorage.getItem('roleId') !== null;
}

// user/login
function login(username, password) {
    let userData = {
        username,
        password
    };

    return requester.post('user/login', 'basic', userData);
}

// user/register
function register(username, password) {
    let userData = {
        username,
        password
    };

    return requester.post('user/register', 'basic', userData);
}

// user/logout
function logout() {
    let logoutData = {
        authtoken: localStorage.getItem('authtoken')
    };

    return requester.post('user/_logout', 'kinvey', logoutData);
}

// saveSession in localStorage
function saveSession(userInfo) {
    const {
        token,
        username,
        userId
    } = userInfo;

    localStorage.setItem('authtoken', token);
    localStorage.setItem('username', username);
    localStorage.setItem('userId', userId);
}


export default {
    isAuth,
    isAdmin,
    login,
    register,
    logout,
    saveSession
}
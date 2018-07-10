import requester from "../requester";

const ADMIN_ROLE_ID = '5275abc5-fdbb-455e-ac27-a4b3e53a8ce1'

function isAuth() {
    return sessionStorage.getItem('authtoken') !== null;
}

function isAdmin() {
    return sessionStorage.getItem('roleId') !== null;
}

// user/login
function login(username, password) {
    let userData = {
        username,
        password
    };

    return requester.post('user', 'login', 'basic', userData);
}

// user/register
function register(username, password) {
    let userData = {
        username,
        password,
        subscriptions: []
    };

    return requester.post('user', '', 'basic', userData);
}

// user/logout
function logout() {
    let logoutData = {
        authtoken: sessionStorage.getItem('authtoken')
    };

    return requester.post('user', '_logout', 'kinvey', logoutData);
}

// saveSession in sessionStorage
function saveSession(userInfo) {
    let userAuth = userInfo._kmd.authtoken;
    sessionStorage.setItem('authtoken', userAuth);
    let username = userInfo.username;
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('userId', userInfo._id);
    sessionStorage.setItem('subscriptions', JSON.stringify(userInfo.subscriptions));

    if (userInfo._kmd.roles) {
        for (let userRole of userInfo._kmd.roles) {
            if (userRole.roleId === ADMIN_ROLE_ID) {
                sessionStorage.setItem('roleId', ADMIN_ROLE_ID)
            }
        }
    }
}


export default {
    isAuth,
    isAdmin,
    login,
    register,
    logout,
    saveSession
}
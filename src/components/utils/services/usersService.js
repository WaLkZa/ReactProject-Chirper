import requester from "../requester"

function loadUserById(userId) {
    return requester.get(`user/${userId}`, 'Basic')
}

function loadUserStats(userId) {
    return requester.get(`user/stats/${userId}`, 'Basic')
}

// function loadUserFollowers(username) {
//     let endpoint = `?query={"subscriptions":"${username}"}`

//     return requester.get('user', endpoint, 'Bearer')
// }

function loadAllUsers() {
    return requester.get('user/all', 'Bearer')
}

function followUser(userId) {
    return requester.get(`user/follow/${userId}`, 'Bearer')
}

function isUserFollowed(userId) {
    return requester.get(`user/is-followed/${userId}`, 'Bearer')
}

// function modifyUser(userId, newSubs) {
//     let newUser = {
//         subscriptions: newSubs
//     }

//     return requester.update('user', userId, 'Bearer', newUser)
// }

// function deleteUser(userId) {
//     return requester.remove('user', `${userId}?hard=true`, 'master')
// }

export default {
    loadUserById,
    loadUserStats,
    //loadUserFollowers,
    loadAllUsers,
    followUser,
    isUserFollowed
    //modifyUser,
    //deleteUser
}
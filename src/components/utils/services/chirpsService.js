import requester from "../requester"
import authService from '../services/authService'

function loadFollowersChirps(subs) {
    let endpoint = `chirps?query={"author":{"$in": [${subs}]}}&sort={"_kmd.ect": -1}`

    return requester.get('appdata', endpoint, 'kinvey')
}

function loadAllChirpsByUsername(username) {
    let endpoint = `chirps?query={"author":"${username}"}&sort={"_kmd.ect": -1}`

    return requester.get('appdata', endpoint, 'kinvey')
}

function loadChirpById(chirpId) {
    let endpoint = `chirps?query={"_id":"${chirpId}"}`

    return requester.get('appdata', endpoint, 'kinvey')
}

function loadLatestXChirps(number) {
    let endpoint = `chirps?query={}&sort={"_kmd.ect": -1}&limit=${number}`

    return requester.get('appdata', endpoint, 'master')
}

function createChirp(text, author) {
    let chirpData = {
        text,
        author
    }

    return requester.post('appdata', 'chirps', 'kinvey', chirpData)
}

function deleteChirp(chirpId) {
    return requester.remove('appdata', `chirps/${chirpId}`, authService.isAdmin() ? 'master' : 'kinvey')
}

function editChirp(chirpId, author, text) {
    let newData = {
        author: author,
        text: text
    }

    return requester.update('appdata', `chirps/${chirpId}`, authService.isAdmin() ? 'master' : 'kinvey', newData)
}

export default {
    loadFollowersChirps,
    loadAllChirpsByUsername,
    loadChirpById,
    loadLatestXChirps,
    createChirp,
    deleteChirp,
    editChirp
}
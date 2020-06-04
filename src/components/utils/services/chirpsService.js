import requester from "../requester"

function loadAllFollowedChirps() {
    return requester.get('chirp/all-followed', 'Bearer')
}

function loadAllChirpsByUserID(userId) {
    return requester.get(`chirp/all/${userId}`, 'Bearer')
}

function loadChirpById(chirpId) {
    return requester.get(`chirp/${chirpId}`, 'Bearer')
}

function loadAllChirps() {
    return requester.get('chirp/all', 'Basic');
}

function createChirp(userId, content) {
    let chirpData = {
        userId,
        content
    }

    return requester.post('chirp/create', 'Bearer', chirpData)
}

function deleteChirp(chirpId) {
    return requester.remove(`chirp/delete/${chirpId}`, 'Bearer')
}

function editChirp(chirpId, content) {
    let newData = {
        content
    }

    return requester.update(`chirp/edit/${chirpId}`, 'Bearer', newData)
}

export default {
    loadAllFollowedChirps,
    loadAllChirpsByUserID,
    loadChirpById,
    loadAllChirps,
    createChirp,
    deleteChirp,
    editChirp
}
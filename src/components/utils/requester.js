import $ from 'jquery'

//MyReactApp
const kinveyBaseUrl = "https://baas.kinvey.com/";
const kinveyAppKey = "kid_S1MVEYqMQ";
const kinveyAppSecret = "8546d0afc25c48a19153f0ae2c6374f7";

// Creates the authentication header
function makeAuth(type) {
    return type === 'basic' ?
        'Basic ' + btoa(kinveyAppKey + ':' + kinveyAppSecret) :
        'Kinvey ' + localStorage.getItem('authtoken');
}

// Creates request object to kinvey
function makeRequest(method, module, endpoint, auth) {
    return {
        method,
        url: kinveyBaseUrl + module + '/' + kinveyAppKey + '/' + endpoint,
        headers: {
            'Authorization': makeAuth(auth),
            'Content-type': 'application/json'
        }
    };
}

// Function to return GET promise
function get(module, endpoint, auth) {
    return $.ajax(makeRequest('GET', module, endpoint, auth));
}

// Function to return POST promise
function post(module, endpoint, auth, data) {
    let req = makeRequest('POST', module, endpoint, auth);
    req.data = JSON.stringify(data);
    return $.ajax(req);
}

// Function to return PUT promise
function update(module, endpoint, auth, data) {
    let req = makeRequest('PUT', module, endpoint, auth);
    req.data = JSON.stringify(data);
    return $.ajax(req);
}

// Function to return DELETE promise
function remove(module, endpoint, auth) {
    return $.ajax(makeRequest('DELETE', module, endpoint, auth));
}

export default {
    get,
    post,
    update,
    remove
}
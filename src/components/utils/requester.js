import $ from 'jquery'

const baseUrl = 'http://localhost:3000/api/';

function makeRequest(method, endpoint, auth) {
    let requestObj = {
        method,
        url: baseUrl + endpoint,
        
        headers: {
            'Content-type': 'application/json'
        }
    };

    if (auth !== 'basic') {
        requestObj['headers']['Authorization'] = `Bearer ${localStorage.getItem('authtoken')}`;
    }

    return requestObj;
}

// Function to return GET promise
function get(endpoint, auth) {
    return $.ajax(makeRequest('GET', endpoint, auth));
}

// Function to return POST promise
function post(endpoint, auth, data) {
    let req = makeRequest('POST', endpoint, auth);
    req.data = JSON.stringify(data);
    return $.ajax(req);
}

// Function to return PUT promise
function update(endpoint, auth, data) {
    let req = makeRequest('PUT', endpoint, auth);
    req.data = JSON.stringify(data);
    return $.ajax(req);
}

// Function to return DELETE promise
function remove(endpoint, auth) {
    return $.ajax(makeRequest('DELETE', endpoint, auth));
}

export default {
    get,
    post,
    update,
    remove
}
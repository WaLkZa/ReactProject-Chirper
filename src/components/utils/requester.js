import $ from 'jquery'

const baseUrl = 'http://localhost:3001/api/';

function makeRequest(method, module, endpoint, auth) {
    let requestObj = {
        method,
        url: baseUrl + module + '/' + endpoint,
        
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
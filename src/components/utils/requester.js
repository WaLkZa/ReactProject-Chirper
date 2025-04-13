const baseUrl = 'http://localhost:3000/api/';

async function makeRequest(method, endpoint, auth, data) {
    const headers = {
        'Content-Type': 'application/json'
    };

    if (auth !== 'Basic') {
        const token = localStorage.getItem('authtoken');
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        method,
        headers
    };

    if (data) {
        config.body = JSON.stringify(data);
    }

    const response = await fetch(baseUrl + endpoint, config);

    if (!response.ok) {
        const error = new Error(`HTTP error! status: ${response.status}`);
        error.status = response.status;
        throw error;
    }

    // Handle empty responses for DELETE requests
    if (method === 'DELETE' && response.status === 204) {
        return null;
    }

    return response.json();
}

// GET request
function get(endpoint, auth) {
    return makeRequest('GET', endpoint, auth);
}

// POST request
function post(endpoint, auth, data) {
    return makeRequest('POST', endpoint, auth, data);
}

// PUT request
function update(endpoint, auth, data) {
    return makeRequest('PUT', endpoint, auth, data);
}

// DELETE request
function remove(endpoint, auth) {
    return makeRequest('DELETE', endpoint, auth);
}

export default {
    get,
    post,
    update,
    remove
};
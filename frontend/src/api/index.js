const SERVER_HOST = "http://127.0.0.1:8000/"

function _fetch(method, kwargs) {

    let { url, body, token = localStorage.getItem('token'), callback, errorCallback } = kwargs
    let headers;

    if (method === 'POST' || method === 'PUT') {
        headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token
        };
    } else if (method === 'GET') {
        headers = {
            'Authorization': 'Token ' + token
        };
    } else {
        throw Error("Unknown method");
    }

    fetch(SERVER_HOST + url, {
        method: method,
        headers: headers,
        body: JSON.stringify(body)
    })
        .then(response => {
            if (response.status >= 400 && response.status < 600) {
                if (errorCallback !== undefined)
                    errorCallback(method + " " + response.status + " error")
                throw Error(method + " " + response.status + " error")
            }
            if (response.status === 204) {
                return "No content"
            }
            return response.json()
        })
        .then(data => callback(data))
        .catch(error => console.log(error))
}

export function get(kwargs) {
    _fetch('GET', kwargs)
}

export function post(kwargs) {
    _fetch('POST', kwargs)
}

export function put(kwargs) {
    _fetch('PUT', kwargs)
}
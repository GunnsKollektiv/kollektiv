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

    let status;
    let statusText;

    fetch(SERVER_HOST + url, {
        method: method,
        headers: headers,
        body: JSON.stringify(body)
    })
        .then(response => {
            status = response.status;
            statusText = response.statusText

            if (status === 204) {
                return "No content"
            }

            return response.json()
        })
        .then(data => {
            if (status >= 400) {
                let details;
                if (data instanceof Array)
                    details = data[0];
                else if (data instanceof Object)
                    details = data[Object.keys(data)[0]][0];
                else
                    details = data;
                if (errorCallback !== undefined)
                    errorCallback({
                        status: status,
                        statusText: statusText,
                        details: details
                    });
                else
                    throw Error(data)
            } else {
                callback(data);
            }
        })
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

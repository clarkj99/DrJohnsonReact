export const baseURL = 'http://localhost:3000/api/v1';

export const fetchFunction = (route, method, data) => {

    const params = (method !== "GET") && { body: JSON.stringify(data) }
    console.log('fetching', `${baseURL}/${route}`, method);
    return fetch(`${baseURL}/${route}`, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        ...params
    })
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response; //we only get here if there is no error
        })
        .then(res => res.json())

};

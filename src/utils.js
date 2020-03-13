export const baseURL = 'https://dekalbwebdev.net/api/v1';
// export const baseURL = 'http://localhost:3000/api/v1';


export const fetchFunction = async (route, method, data) => {

    const params = (method !== "GET") && { body: JSON.stringify(data) }
    const response = await fetch(`${baseURL}/${route}`, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        ...params
    })
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return await response.json();

};


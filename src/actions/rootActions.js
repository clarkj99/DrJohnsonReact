export const login = (user) => {
    return {
        type: "LOGIN",
        user
    }
}

export const logout = () => {
    return {
        type: "LOGOUT"
    }
}

export const add_encounters = (encounters) => {
    return {
        type: 'ADD_ENCOUNTERS',
        encounters
    }
} 

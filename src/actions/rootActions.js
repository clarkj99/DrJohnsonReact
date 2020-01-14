export const login = (user) => {
    return {
        type: "LOGIN",
        user
    }
}
export const addLogin = (user) => {
    return {
        type: "ADD_LOGIN",
        user
    }
}

export const logout = () => {
    return {
        type: "LOGOUT"
    }
}

export const addEncounters = (encounters) => {
    return {
        type: 'ADD_ENCOUNTERS',
        encounters
    }
}

export const selectEncounter = (encounter) => {
    return {
        type: 'SELECT_ENCOUNTER',
        encounter
    }
}

export const clearEncounter = () => {
    return {
        type: 'CLEAR_ENCOUNTER'
    }
}

export const startEncounter = () => {
    return {
        type: 'START_ENCOUNTER'
    }
}

export const stopEncounter = () => {
    return {
        type: 'STOP_ENCOUNTER'
    }
} 
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

export const startEncounter = (encounter) => {
    return {
        type: 'START_ENCOUNTER',
        encounter
    }
}

export const stopEncounter = () => {
    return {
        type: 'STOP_ENCOUNTER'
    }
}

export const changeHPI = (hpi) => {
    return {
        type: 'CHANGE_HPI',
        hpi
    }
} 
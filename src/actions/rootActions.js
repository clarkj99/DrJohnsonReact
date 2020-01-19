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

export const updateEncounterChild = (model, value) => {
    return {
        type: 'UPDATE_ENCOUNTER_CHILD',
        model,
        value
    }
}

export const setStep = (stepNumber) => {
    return {
        type: 'SET_STEP',
        stepNumber
    }
}

export const addUsers = (userType, userList) => {
    return {
        type: 'ADD_USERS',
        userType,
        userList
    }
}

export const selectPatient = (user) => {
    return {
        type: 'SELECT_PATIENT',
        user,

    }
}

export const clearUser = () => {
    return {
        type: 'CLEAR_USER'

    }
}
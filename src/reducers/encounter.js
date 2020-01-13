const encounter = (state = { encounters: [], selectedEncounter: {}, startEncounter: false }, action) => {
    switch (action.type) {
        case 'ADD_ENCOUNTERS':
            return { ...state, encounters: action.encounters }
        case 'SELECT_ENCOUNTER':
            return { ...state, selectedEncounter: action.encounter }
        case 'CLEAR_ENCOUNTER':
            return { ...state, selectedEncounter: {} }
        case 'START_ENCOUNTER':
            return { ...state, startEncounter: true }
        default:
            return state
    }
}

export default encounter;
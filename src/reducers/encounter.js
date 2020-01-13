const encounter = (state = { encounters: [], selectedEncounter: {}, editingEncounter: false }, action) => {
    switch (action.type) {
        case 'ADD_ENCOUNTERS':
            return { ...state, encounters: action.encounters }
        case 'SELECT_ENCOUNTER':
            return { ...state, selectedEncounter: action.encounter }
        case 'CLEAR_ENCOUNTER':
            return { ...state, selectedEncounter: {} }
        case 'START_ENCOUNTER':
            return { ...state, editingEncounter: true }
        case 'STOP_ENCOUNTER':
            return { ...state, editingEncounter: false }
        default:
            return state
    }
}

export default encounter;
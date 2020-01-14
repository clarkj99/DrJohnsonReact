const encounter = (state = { encounters: [], selectedEncounter: {}, editingEncounter: false }, action) => {
    console.log(action);
    switch (action.type) {
        case 'ADD_ENCOUNTERS':
            return { ...state, encounters: action.encounters }
        case 'SELECT_ENCOUNTER':
            return { ...state, selectedEncounter: { ...action.encounter } }
        case 'CLEAR_ENCOUNTER':
            return { ...state, selectedEncounter: {} }
        case 'START_ENCOUNTER':
            return { ...state, editingEncounter: true, selectedEncounter: { ...action.encounter } }
        case 'STOP_ENCOUNTER':
            return { ...state, editingEncounter: false, selectedEncounter: {} }
        case 'UPDATE_HPI':
            return { ...state, selectedEncounter: { ...state.selectedEncounter, hpi: { ...action.hpi } } }
        default:
            return state
    }
}

export default encounter;
const encounter = (state = { encounters: [], selectedEncounter: {}, editedEncounter: {}, editingEncounter: false }, action) => {
    console.log(action);
    switch (action.type) {
        case 'ADD_ENCOUNTERS':
            return { ...state, encounters: action.encounters }
        case 'SELECT_ENCOUNTER':
            return { ...state, selectedEncounter: { ...action.encounter } }
        case 'CLEAR_ENCOUNTER':
            return { ...state, selectedEncounter: {} }
        case 'START_ENCOUNTER':
            return { ...state, editingEncounter: true, selectedEncounter: { ...action.encounter }, editedEncounter: { ...action.encounter } }
        case 'STOP_ENCOUNTER':
            return { ...state, editingEncounter: false }
        case 'CHANGE_HPI':
            return { ...state, editedEncounter: { ...state.editedEncounter, hpi: { ...action.hpi } } }
        default:
            return state
    }
}

export default encounter;
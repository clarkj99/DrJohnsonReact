const initialEncounter = { encounters: [], selectedEncounter: {}, editingEncounter: false }
const encounter = (state = { ...initialEncounter }, action) => {
    switch (action.type) {
        case 'ADD_ENCOUNTERS':
            return { ...state, encounters: action.encounters }
        case 'ADD_ENCOUNTER':
            return { ...state, encounters: [...state.encounters, action.encounter] }
        case 'SELECT_ENCOUNTER':
            return { ...state, selectedEncounter: { ...action.encounter } }
        case 'DELETE_ENCOUNTER':
            return {
                ...state, encounters: state.encounters.filter(encounter => encounter.id !== action.encounter.id)
            }
        case 'CLEAR_ENCOUNTER':
            return { ...state, selectedEncounter: {} }
        case 'START_ENCOUNTER':
            return { ...state, editingEncounter: true, selectedEncounter: { ...action.encounter } }
        case 'STOP_ENCOUNTER':
            return { ...state, editingEncounter: false, selectedEncounter: {} }
        case 'UPDATE_HPI':
            return { ...state, selectedEncounter: { ...state.selectedEncounter, hpi: { ...action.hpi } } }
        case 'UPDATE_ROSYSTEM':
            return { ...state, selectedEncounter: { ...state.selectedEncounter, rosystem: { ...action.hpi } } }
        case 'UPDATE_ENCOUNTER_CHILD':
            return { ...state, selectedEncounter: { ...state.selectedEncounter, [action.model]: { ...action.value } } }
        case 'RESET_ENCOUNTER':
            return { ...initialEncounter }
        default:
            return state
    }
}

export default encounter;